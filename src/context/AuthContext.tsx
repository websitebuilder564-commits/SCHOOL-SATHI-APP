import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { authService, AuthResponse } from '../services/authService';
import { MOCK_USERS } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<AuthResponse>;
  loginWithSupabase: (email: string, password?: string) => Promise<AuthResponse>;
  loginStudent: (params: { studentName: string; admissionNo: string; studentClass: string; mobile: string; rollNo?: number | string }) => Promise<AuthResponse>;
  loginParent: (params: { studentName: string; admissionNo: string; studentClass: string; mobile: string; rollNo?: number | string }) => Promise<AuthResponse>;
  loginTeacher: (params: { officialId: string; secretCode: string }) => Promise<AuthResponse>;
  loginPrincipal: (params: { officialId: string; secretCode: string }) => Promise<AuthResponse>;
  loginFirstTime: (params: { mobile: string; otp: string; role: UserRole; name?: string; studentAdmissionNo?: string; agreedToTerms: boolean }) => Promise<AuthResponse>;
  requestOtp: (mobile: string) => Promise<{ success: boolean; message: string; demoOtp: string }>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync session with Supabase on mount and listen to auth changes
  useEffect(() => {
    let isMounted = true;

    // Check active Supabase session
    const checkSupabaseSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && isMounted && !user) {
          const determinedUser = await authService.checkProfileAndDetermineRole(session.user);
          if (isMounted) {
            setUser(determinedUser);
            authService.completeSuccessfulLogin(determinedUser, 'Supabase Session Restore');
          }
        }
      } catch {
        // Fallback
      }
    };

    checkSupabaseSession();

    // Subscribe to auth state changes (School Saathi -> Login -> Supabase Auth -> Check Profile -> Determine Role)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const determinedUser = await authService.checkProfileAndDetermineRole(session.user);
        if (isMounted) {
          setUser(determinedUser);
          authService.completeSuccessfulLogin(determinedUser, 'Supabase Auth Event');
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthResult = (res: AuthResponse): AuthResponse => {
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const loginWithSupabase = async (email: string, password?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginWithSupabase(email, password);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const loginStudent = async (params: { studentName: string; admissionNo: string; studentClass: string; mobile: string; rollNo?: number | string }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginStudent(params);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const loginParent = async (params: { studentName: string; admissionNo: string; studentClass: string; mobile: string; rollNo?: number | string }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginParent(params);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const loginTeacher = async (params: { officialId: string; secretCode: string }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginTeacher(params);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const loginPrincipal = async (params: { officialId: string; secretCode: string }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginPrincipal(params);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const loginFirstTime = async (params: { mobile: string; otp: string; role: UserRole; name?: string; studentAdmissionNo?: string; agreedToTerms: boolean }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginFirstTime(params);
      return handleAuthResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const requestOtp = async (mobile: string) => {
    return authService.requestOtp(mobile);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchDemoRole = async (role: UserRole) => {
    const demoUser = MOCK_USERS.find((u) => u.role === role);
    if (demoUser) {
      const res = authService.completeSuccessfulLogin(demoUser, `Role Switch: ${role}`);
      handleAuthResult(res);
    }
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    return authService.verifyRole(user, allowedRoles);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithSupabase,
        loginStudent,
        loginParent,
        loginTeacher,
        loginPrincipal,
        loginFirstTime,
        requestOtp,
        logout,
        switchDemoRole,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
