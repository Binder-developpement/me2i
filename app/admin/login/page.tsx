'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { toast } from 'sonner'
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        setErrorMsg(error.message || 'Identifiants incorrects')
        toast.error('Échec de la connexion : ' + error.message)
        setLoading(false)
        return
      }

      toast.success('Connexion réussie ! Redirection...')
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err?.message || 'Une erreur est survenue')
      toast.error('Erreur lors de la connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col items-center justify-center p-4">
      {/* WordPress-style Login Container */}
      <div className="w-full max-w-sm">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#1E3A5F] text-white font-black text-xl shadow-md mb-3">
            M
          </div>
          <h1 className="text-xl font-bold text-[#1d2327]">ME2I Administration</h1>
          <p className="text-xs text-[#646970] mt-1">
            Connectez-vous pour accéder au panneau de gestion
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm">
          {errorMsg && (
            <div className="mb-4 p-3 bg-[#fcf0f1] border-l-4 border-[#d63638] text-xs text-[#d63638]">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#1d2327] mb-1 uppercase tracking-wider"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#8c8f94]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@me2i.cm"
                  className="w-full pl-9 pr-3 py-2 border border-[#8c8f94] rounded-sm text-sm focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#1d2327] mb-1 uppercase tracking-wider"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8c8f94]" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-[#8c8f94] rounded-sm text-sm focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-sm font-semibold py-2.5 px-4 rounded-sm transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center text-xs text-[#646970] space-y-2">
          <p>
            <a href="/" className="hover:text-[#2271b1] transition-colors">
              &larr; Retourner sur le site ME2I
            </a>
          </p>
          <p>© {new Date().getFullYear()} ME2I — All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
