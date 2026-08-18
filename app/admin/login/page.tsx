'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { toast } from 'sonner'
import { Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      const supabase = createClientSupabase()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('L\'e-mail n\'a pas encore été confirmé. Utilisez contact@me2i.cm ou confirmez l\'adresse dans Supabase Users.')
        } else {
          setErrorMsg(error.message || 'Identifiant ou mot de passe incorrect.')
        }
        toast.error('Échec : ' + error.message)
        setLoading(false)
        return
      }

      toast.success('Connexion réussie ! Redirection...')
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err?.message || 'Une erreur est survenue lors de la connexion.')
      toast.error('Erreur lors de la connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col items-center justify-center p-4 select-none font-sans text-[#2c3338]">
      <div className="w-full max-w-[320px] sm:max-w-[340px]">
        {/* Logo MCI en texte simple couleur primaire */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-block text-3xl font-bold tracking-tight text-[#1E3A5F] hover:opacity-80 transition-opacity"
            title="Aller sur le site MCI"
          >
            MCI
          </Link>
        </div>

        {/* WordPress Error Message Notice */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-white border-l-4 border-[#d63638] text-xs text-[#2c3338] shadow-sm">
            <strong className="text-[#d63638]">ERREUR :</strong> {errorMsg}
          </div>
        )}

        {/* WordPress Authentic Login Form Box */}
        <form
          onSubmit={handleLogin}
          className="bg-white border border-[#c3c4c7] p-6 shadow-sm space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-normal text-[#1d2327] mb-1.5"
            >
              Identifiant ou adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#8c8f94] rounded-sm text-sm text-[#2c3338] bg-white focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] transition-shadow"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-normal text-[#1d2327] mb-1.5"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-[#8c8f94] rounded-sm text-sm text-[#2c3338] bg-white focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] transition-shadow"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-[#8c8f94] hover:text-[#2271b1] transition-colors p-0.5"
                title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Submit button */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-1.5 text-xs text-[#50575e] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded-sm border-[#8c8f94] text-[#2271b1] focus:ring-[#2271b1]"
              />
              <span>Se souvenir de moi</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors border border-[#2271b1] flex items-center gap-1.5 shadow-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </div>
        </form>

        {/* WordPress Bottom Links */}
        <div className="mt-4 space-y-2 text-xs text-[#2271b1]">
          <p>
            <Link href="/" className="hover:text-[#135e96] transition-colors">
              &larr; Aller sur MCI
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
