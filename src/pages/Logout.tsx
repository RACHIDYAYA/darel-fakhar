import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Logout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await signOut();
      navigate('/login', { replace: true });
    })();
  }, [signOut, navigate]);

  return null;
};

export default Logout;
