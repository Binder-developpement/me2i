'use client'

import { useState } from 'react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { toast } from 'sonner'
import { Lock, Save, Loader2, User, ShieldCheck } from 'lucide-react'

export default function AccountSettingsClient({ userEmail }: { userEmail?: string }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      toast.error('Veuillez saisir un nouveau mot de passe')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    try {
      setLoading(true)
      const supabase = createClientSupabase()
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Mot de passe mis à jour avec succès !')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Account Details Box */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-[#2271b1]" />
          Profil administrateur
        </h2>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#646970] mb-1">Adresse e-mail :</label>
            <div className="p-2.5 bg-[#f6f7f7] border border-[#c3c4c7] rounded-sm font-bold text-[#1d2327]">
              {userEmail || 'admin@me2i.cm'}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-emerald-700 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Compte actif avec privilèges d'administration globaux</span>
          </div>
        </div>
      </div>

      {/* Security Box */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#2271b1]" />
          Modifier le mot de passe
        </h2>

        <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#1d2327] mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1d2327] mb-1">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>Mettre à jour le mot de passe</span>
          </button>
        </form>
      </div>
    </div>
  )
}
