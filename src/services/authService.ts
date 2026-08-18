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

  // 1. Student Sector Login (Student Name + Admission No + Roll No)
  loginStudent: async (params: {
    studentName: string;
    admissionNo: string;
    rollNo: number | string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const nameQuery = params.studentName.trim().toLowerCase();
    const admQuery = params.admissionNo.trim().toUpperCase();
    const rollQuery = Number(params.rollNo);

    // Look up student in official school database
    const matchedStudent = MOCK_STUDENTS.find((s) => {
      const matchAdm = s.admissionNo.toUpperCase() === admQuery || s.admissionNo.toUpperCase().includes(admQuery.replace(/[^A-Z0-9]/g, ''));
      const matchRoll = s.rollNo === rollQuery;
      const matchName = s.name.toLowerCase().includes(nameQuery) || nameQuery.includes(s.name.toLowerCase().split(' ')[0]);
      return (matchAdm && matchRoll) || (matchAdm && matchName) || (matchRoll && matchName);
    });

    if (!matchedStudent) {
      auditService.logAction({
        userId: 'ANONYMOUS_STUDENT',
        userName: params.studentName,
        userRole: 'student',
        action: 'FAILED_STUDENT_LOGIN',
        resource: `Admission #${params.admissionNo}, Roll #${params.rollNo}`,
        status: 'UNAUTHORIZED',
        details: `Failed student verification attempt for Name: ${params.studentName}, Adm: ${params.admissionNo}, Roll: ${params.rollNo}`
      });

      return {
        success: false,
        error: {
          code: 'STUDENT_NOT_FOUND',
          message: 'No student record found matching this Name, Admission Number, and Roll Number. (Try: Rahul Sharma, ADM-2022-801, Roll 14)',
        },
      };
    }

    // Find or construct the user account for this student
    const baseUser = MOCK_USERS.find((u) => u.role === 'student' && (u.studentId === matchedStudent.id || u.name.toLowerCase() === matchedStudent.name.toLowerCase())) || {
      id: `USR-${matchedStudent.id}`,
      name: matchedStudent.name,
      email: `${matchedStudent.name.toLowerCase().replace(/\s+/g, '.')}@student.schoolsaathi.edu`,
      role: 'student' as UserRole,
      studentId: matchedStudent.id,
      assignedClass: `${matchedStudent.class}${matchedStudent.section}`,
      avatar: matchedStudent.avatar,
      phone: matchedStudent.parentPhone,
      joinedDate: '2022-06-15',
    };

    return authService.completeSuccessfulLogin(baseUser, `Student Portal (Adm: ${matchedStudent.admissionNo}, Class: ${matchedStudent.class}${matchedStudent.section})`);
  },

  // 2. Parent Sector Login (Student Name + Student Admission Number + Student Roll Number)
  loginParent: async (params: {
    studentName: string;
    admissionNo: string;
    rollNo: number | string;
    parentPhone?: string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const nameQuery = params.studentName.trim().toLowerCase();
    const admQuery = params.admissionNo.trim().toUpperCase();
    const rollQuery = Number(params.rollNo);

    // Look up child
    const matchedChild = MOCK_STUDENTS.find((s) => {
      const matchAdm = s.admissionNo.toUpperCase() === admQuery || s.admissionNo.toUpperCase().includes(admQuery.replace(/[^A-Z0-9]/g, ''));
      const matchRoll = s.rollNo === rollQuery;
      const matchName = s.name.toLowerCase().includes(nameQuery) || nameQuery.includes(s.name.toLowerCase().split(' ')[0]);
      return (matchAdm && matchRoll) || (matchAdm && matchName) || (matchRoll && matchName);
    });

    if (!matchedChild) {
      auditService.logAction({
        userId: 'ANONYMOUS_PARENT',
        userName: `Parent of ${params.studentName}`,
        userRole: 'parent',
        action: 'FAILED_PARENT_LOGIN',
        resource: `Student Adm #${params.admissionNo}, Roll #${params.rollNo}`,
        status: 'UNAUTHORIZED',
        details: `Parent login failed for Student: ${params.studentName}, Adm: ${params.admissionNo}, Roll: ${params.rollNo}`
      });

      return {
        success: false,
        error: {
          code: 'CHILD_NOT_FOUND',
          message: 'Could not locate child in school records. Please check the student name, admission number, and roll number. (Try: Rahul Sharma, ADM-2022-801, Roll 14)',
        },
      };
    }

    // Find parent user linked to this child
    const parentUser = MOCK_USERS.find((u) => u.role === 'parent' && u.linkedStudentIds?.includes(matchedChild.id)) || {
      id: 'USR-PAR001',
      name: matchedChild.parentName || 'Anita Sharma',
      email: matchedChild.parentEmail || 'parent@demo.com',
      role: 'parent' as UserRole,
      parentId: 'PAR001',
      linkedStudentIds: [matchedChild.id, 'STU002'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      phone: matchedChild.parentPhone || '+91 98765 43211',
      joinedDate: '2022-06-15',
    };

    return authService.completeSuccessfulLogin(parentUser, `Parent Portal (Linked to: ${matchedChild.name})`);
  },

  // 3. Teacher Sector Login (Registered Phone + Password)
  loginTeacher: async (params: {
    phone: string;
    password: string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const cleanPhone = params.phone.replace(/[^0-9]/g, '');
    const cleanPwd = params.password.trim();

    // Look up teacher in faculty records
    const teacherUser = MOCK_USERS.find((u) => {
      if (u.role !== 'teacher') return false;
      const uPhone = (u.phone || '').replace(/[^0-9]/g, '');
      return uPhone.includes(cleanPhone) || cleanPhone.includes(uPhone) || cleanPhone === '9876543212' || cleanPhone.slice(-10) === '9876543212';
    });

    if (!teacherUser && cleanPhone !== '9876543212') {
      return {
        success: false,
        error: {
          code: 'TEACHER_NOT_FOUND',
          message: 'No registered faculty account found for this phone number. (Demo phone: 9876543212, password: teacher123)',
        },
      };
    }

    if (cleanPwd.length < 3) {
      return {
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Please enter a valid password (minimum 3 characters).',
        },
      };
    }

    const verifiedTeacher = teacherUser || MOCK_USERS.find((u) => u.role === 'teacher')!;
    return authService.completeSuccessfulLogin(verifiedTeacher, 'Faculty Attendance & Academic Portal');
  },

  // 4. Principal / Admin Sector Login (Registered Phone + Password)
  loginPrincipal: async (params: {
    phone: string;
    password: string;
  }): Promise<AuthResponse> => {
    await new Promise((res) => setTimeout(res, 350));

    const cleanPhone = params.phone.replace(/[^0-9]/g, '');
    const cleanPwd = params.password.trim();

    const principalUser = MOCK_USERS.find((u) => {
      if (u.role !== 'principal') return false;
      const uPhone = (u.phone || '').replace(/[^0-9]/g, '');
      return uPhone.includes(cleanPhone) || cleanPhone.includes(uPhone) || cleanPhone === '9876543213' || cleanPhone.slice(-10) === '9876543213';
    });

    if (!principalUser && cleanPhone !== '9876543213') {
      return {
        success: false,
        error: {
          code: 'ADMIN_NOT_FOUND',
          message: 'No institutional executive account found for this phone number. (Demo phone: 9876543213, password: principal123)',
        },
      };
    }

    if (cleanPwd.length < 3) {
      return {
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Please enter a valid administrative password.',
        },
      };
    }

    const verifiedAdmin = principalUser || MOCK_USERS.find((u) => u.role === 'principal')!;
    return authService.completeSuccessfulLogin(verifiedAdmin, 'Institutional Executive Administration');
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
