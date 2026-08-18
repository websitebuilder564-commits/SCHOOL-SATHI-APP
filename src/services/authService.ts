import { User, UserRole, Student } from '../types';
import { MOCK_USERS, MOCK_STUDENTS } from '../data/mockData';
import { auditService } from './auditService';

const SESSION_STORAGE_KEY = 'schoolsaathi_auth_session';

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: {
    code: string;
    message: string;
  };
}

export const authService = {
  // Legacy / fallback direct email login
  login: async (email: string, _password?: string): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 250));
    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!foundUser) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials. Please verify your details.',
        },
      };
    }

    return authService.completeSuccessfulLogin(foundUser, 'Email Authentication');
  },

  // 1. Student Sector Login (Name + Admission Number + Class + Registered Mobile)
  loginStudent: async (params: {
    studentName: string;
    admissionNo: string;
    studentClass: string;
    mobile: string;
    rollNo?: number | string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const nameQuery = params.studentName.trim();
    const admQuery = params.admissionNo.trim().toUpperCase();
    const classQuery = params.studentClass.trim();
    const mobileQuery = params.mobile.replace(/[^0-9]/g, '');

    if (!nameQuery || nameQuery.length < 2) {
      return {
        success: false,
        error: { code: 'INVALID_NAME', message: 'Please enter a valid student full name (e.g. Rahul Sharma).' }
      };
    }
    if (!admQuery || admQuery.length < 3) {
      return {
        success: false,
        error: { code: 'INVALID_ADMISSION_NO', message: 'Please enter a valid Admission Number (e.g. ADM-2022-801).' }
      };
    }
    if (!classQuery) {
      return {
        success: false,
        error: { code: 'INVALID_CLASS', message: 'Please enter or select the enrolled Class (e.g. Class 8-A).' }
      };
    }
    if (mobileQuery.length < 10) {
      return {
        success: false,
        error: { code: 'INVALID_MOBILE', message: 'Please enter a valid 10-digit registered mobile number (e.g. 9876543210).' }
      };
    }

    // Look up student in official school database
    const matchedStudent = MOCK_STUDENTS.find((s) => {
      const matchAdm = s.admissionNo.toUpperCase() === admQuery || s.admissionNo.toUpperCase().includes(admQuery.replace(/[^A-Z0-9]/g, ''));
      const matchName = s.name.toLowerCase().includes(nameQuery.toLowerCase()) || nameQuery.toLowerCase().includes(s.name.toLowerCase().split(' ')[0]);
      return matchAdm || matchName;
    });

    if (matchedStudent) {
      const baseUser = MOCK_USERS.find((u) => u.role === 'student' && (u.studentId === matchedStudent.id || u.name.toLowerCase() === matchedStudent.name.toLowerCase())) || {
        id: `USR-${matchedStudent.id}`,
        name: matchedStudent.name,
        email: `${matchedStudent.name.toLowerCase().replace(/\s+/g, '.')}@student.schoolsaathi.edu`,
        role: 'student' as UserRole,
        studentId: matchedStudent.id,
        assignedClass: `${matchedStudent.class}${matchedStudent.section}`,
        avatar: matchedStudent.avatar,
        phone: mobileQuery || matchedStudent.parentPhone,
        joinedDate: '2022-06-15',
      };
      return authService.completeSuccessfulLogin(baseUser, `Student Portal (Adm: ${matchedStudent.admissionNo}, Class: ${matchedStudent.class}${matchedStudent.section})`);
    }

    // Dynamic verified student session
    const dynamicStudentUser: User = {
      id: `USR-STU-${Date.now().toString().slice(-4)}`,
      name: nameQuery,
      email: `${nameQuery.toLowerCase().replace(/\s+/g, '.')}@student.schoolsaathi.edu`,
      role: 'student',
      studentId: `STU-${admQuery.replace(/[^A-Z0-9]/g, '') || '801'}`,
      assignedClass: classQuery,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: mobileQuery,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    return authService.completeSuccessfulLogin(dynamicStudentUser, `Student Portal (${nameQuery}, Adm: ${admQuery}, Class: ${classQuery})`);
  },

  // 2. Parent Sector Login (Child Name + Admission Number + Class + Registered Parent Mobile)
  loginParent: async (params: {
    studentName: string;
    admissionNo: string;
    studentClass: string;
    mobile: string;
    rollNo?: number | string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const nameQuery = params.studentName.trim();
    const admQuery = params.admissionNo.trim().toUpperCase();
    const classQuery = params.studentClass.trim();
    const mobileQuery = params.mobile.replace(/[^0-9]/g, '');

    if (!nameQuery || nameQuery.length < 2) {
      return {
        success: false,
        error: { code: 'INVALID_NAME', message: 'Please enter child / ward full name (e.g. Rahul Sharma).' }
      };
    }
    if (!admQuery || admQuery.length < 3) {
      return {
        success: false,
        error: { code: 'INVALID_ADMISSION_NO', message: 'Please enter child Admission Number (e.g. ADM-2022-801).' }
      };
    }
    if (!classQuery) {
      return {
        success: false,
        error: { code: 'INVALID_CLASS', message: 'Please enter child Class (e.g. Class 8-A).' }
      };
    }
    if (mobileQuery.length < 10) {
      return {
        success: false,
        error: { code: 'INVALID_MOBILE', message: 'Please enter your 10-digit registered parent mobile number (e.g. 9876543211).' }
      };
    }

    const matchedChild = MOCK_STUDENTS.find((s) => {
      const matchAdm = s.admissionNo.toUpperCase() === admQuery || s.admissionNo.toUpperCase().includes(admQuery.replace(/[^A-Z0-9]/g, ''));
      const matchName = s.name.toLowerCase().includes(nameQuery.toLowerCase()) || nameQuery.toLowerCase().includes(s.name.toLowerCase().split(' ')[0]);
      return matchAdm || matchName;
    });

    if (matchedChild) {
      const parentUser = MOCK_USERS.find((u) => u.role === 'parent' && u.linkedStudentIds?.includes(matchedChild.id)) || {
        id: 'USR-PAR001',
        name: matchedChild.parentName || 'Anita Sharma',
        email: matchedChild.parentEmail || 'parent@demo.com',
        role: 'parent' as UserRole,
        parentId: 'PAR001',
        linkedStudentIds: [matchedChild.id, 'STU002'],
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: mobileQuery || matchedChild.parentPhone || '+91 98765 43211',
        joinedDate: '2022-06-15',
      };
      return authService.completeSuccessfulLogin(parentUser, `Parent Portal (Linked to: ${matchedChild.name})`);
    }

    // Dynamic verified parent account
    const dynamicParentUser: User = {
      id: `USR-PAR-${Date.now().toString().slice(-4)}`,
      name: `Parent of ${nameQuery}`,
      email: `parent.${nameQuery.toLowerCase().replace(/\s+/g, '')}@family.schoolsaathi.edu`,
      role: 'parent',
      parentId: `PAR-${Date.now().toString().slice(-4)}`,
      linkedStudentIds: ['STU001', 'STU002'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      phone: mobileQuery,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    return authService.completeSuccessfulLogin(dynamicParentUser, `Parent Portal (Ward: ${nameQuery}, Adm: ${admQuery})`);
  },

  // 3. Teacher Sector Login (School Official ID + Secret Code: cbse 2026)
  loginTeacher: async (params: {
    officialId: string;
    secretCode: string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const idQuery = params.officialId.trim();
    const rawSecret = (params.secretCode || '').trim().toLowerCase();
    const normalizedSecret = rawSecret.replace(/\s+/g, '');

    if (!idQuery || idQuery.length < 2) {
      return {
        success: false,
        error: {
          code: 'INVALID_OFFICIAL_ID',
          message: 'Please enter your School Official ID or Email (e.g. teacher@dmps.edu.in or TCH-8801).',
        },
      };
    }

    // Check secret code: "cbse 2026" or "cbse2026"
    if (normalizedSecret !== 'cbse2026') {
      auditService.logAction({
        userId: 'ANONYMOUS_FACULTY',
        userName: idQuery,
        userRole: 'teacher',
        action: 'FAILED_TEACHER_SECRET_CODE',
        resource: 'Faculty Portal Clearance',
        status: 'UNAUTHORIZED',
        details: `Failed faculty login attempt for Official ID: ${idQuery}. Invalid secret code entered: ${params.secretCode}`
      });

      return {
        success: false,
        error: {
          code: 'INVALID_SECRET_CODE',
          message: 'Invalid Secret Code. School official faculty clearance requires secret code: cbse 2026',
        },
      };
    }

    // Match teacher or assign teacher profile
    const teacherUser = MOCK_USERS.find((u) => u.role === 'teacher' && (
      u.email.toLowerCase() === idQuery.toLowerCase() ||
      u.name.toLowerCase().includes(idQuery.toLowerCase()) ||
      idQuery.toUpperCase() === 'TCH-8801' ||
      idQuery.toLowerCase() === 'teacher@dmps.edu.in'
    )) || MOCK_USERS.find((u) => u.role === 'teacher')!;

    return authService.completeSuccessfulLogin(teacherUser, `Faculty Portal (Official ID: ${idQuery})`);
  },

  // 4. Principal / Admin Sector Login (School Official ID + Secret Code: cbse 2026)
  loginPrincipal: async (params: {
    officialId: string;
    secretCode: string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const idQuery = params.officialId.trim();
    const rawSecret = (params.secretCode || '').trim().toLowerCase();
    const normalizedSecret = rawSecret.replace(/\s+/g, '');

    if (!idQuery || idQuery.length < 2) {
      return {
        success: false,
        error: {
          code: 'INVALID_OFFICIAL_ID',
          message: 'Please enter your School Official ID or Email (e.g. principal@dmps.edu.in or ADM-001).',
        },
      };
    }

    // Check secret code: "cbse 2026" or "cbse2026"
    if (normalizedSecret !== 'cbse2026') {
      auditService.logAction({
        userId: 'ANONYMOUS_PRINCIPAL',
        userName: idQuery,
        userRole: 'principal',
        action: 'FAILED_PRINCIPAL_SECRET_CODE',
        resource: 'Executive Administration Clearance',
        status: 'UNAUTHORIZED',
        details: `Failed principal login attempt for Official ID: ${idQuery}. Invalid secret code entered: ${params.secretCode}`
      });

      return {
        success: false,
        error: {
          code: 'INVALID_SECRET_CODE',
          message: 'Invalid Secret Code. Institutional executive clearance requires secret code: cbse 2026',
        },
      };
    }

    const principalUser = MOCK_USERS.find((u) => u.role === 'principal')!;
    return authService.completeSuccessfulLogin(principalUser, `Executive Administration (Official ID: ${idQuery})`);
  },

  // 5. First-Time Registration / OTP Verification
  requestOtp: async (mobile: string): Promise<{ success: boolean; message: string; demoOtp: string }> => {
    await new Promise((res) => setTimeout(res, 300));
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      return {
        success: false,
        message: 'Please enter a valid 10-digit mobile number.',
        demoOtp: '',
      };
    }

    return {
      success: true,
      message: `A 6-digit verification OTP has been dispatched to ${mobile}. (Demo OTP: 123456)`,
      demoOtp: '123456',
    };
  },

  loginFirstTime: async (params: {
    mobile: string;
    otp: string;
    role: UserRole;
    name?: string;
    studentAdmissionNo?: string;
    agreedToTerms: boolean;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 400));

    if (!params.agreedToTerms) {
      return {
        success: false,
        error: {
          code: 'TERMS_NOT_ACCEPTED',
          message: 'You must review and accept the SchoolSaathi AI Terms & Conditions and Student Data Privacy Policy to proceed.',
        },
      };
    }

    const cleanOtp = params.otp.trim();
    if (cleanOtp !== '123456' && cleanOtp.length !== 6) {
      return {
        success: false,
        error: {
          code: 'INVALID_OTP',
          message: 'Invalid OTP. Please enter the 6-digit code sent to your phone (Demo code: 123456).',
        },
      };
    }

    // Resolve user based on selected role
    let targetUser = MOCK_USERS.find((u) => u.role === params.role);
    if (!targetUser) {
      targetUser = MOCK_USERS[0];
    }

    const firstTimeUser: User = {
      ...targetUser,
      name: params.name || targetUser.name,
      phone: params.mobile.startsWith('+') ? params.mobile : `+91 ${params.mobile}`,
    };

    return authService.completeSuccessfulLogin(
      firstTimeUser,
      `First-Time Verification (Role: ${params.role.toUpperCase()}, Mobile: ${params.mobile})`
    );
  },

  // Helper for committing session & audit logging
  completeSuccessfulLogin: (user: User, resourceLabel: string): AuthResponse => {
    const verifiedUser: User = { ...user };
    const sessionToken = `jwt_${verifiedUser.id}_${Date.now()}`;

    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(verifiedUser));
    } catch {
      // Ignore storage errors
    }

    auditService.logAction({
      userId: verifiedUser.id,
      userName: verifiedUser.name,
      userRole: verifiedUser.role,
      action: 'AUTH_LOGIN_SUCCESS',
      resource: resourceLabel,
      status: 'SUCCESS',
      details: `User ${verifiedUser.name} authenticated with verified role '${verifiedUser.role}'`
    });

    return {
      success: true,
      user: verifiedUser,
      token: sessionToken,
    };
  },

  getCurrentUser: (): User | null => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    } catch {
      // Fallback
    }
    // Return null when logged out so LoginPage is properly shown
    return null;
  },

  logout: (): void => {
    const user = authService.getCurrentUser();
    if (user) {
      auditService.logAction({
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: 'AUTH_LOGOUT',
        resource: 'Session Management',
        status: 'SUCCESS',
        details: `User ${user.name} signed out.`
      });
    }
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
  },

  verifyRole: (user: User | null, allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
};
