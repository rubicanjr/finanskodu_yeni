import { MessageSquare } from 'lucide-react';

interface LoginScreenProps {
  onSignIn: () => void;
}

export default function LoginScreen({ onSignIn }: LoginScreenProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <MessageSquare size={48} className="text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Kod Odası'na Hoş Geldiniz</h1>
        <p className="text-muted-foreground mb-8">
          Yatırım, borsa ve ekonomiyle ilgili birlikte tartışmak için Google hesabınızla giriş yapın.
        </p>
        <button
          onClick={onSignIn}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Google ile Giriş Yap
        </button>
        <p className="text-sm text-muted-foreground mt-4">
          Giriş yaparak kullanıcı yaşantısı kurallarını kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
