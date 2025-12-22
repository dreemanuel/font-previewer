import type { TemplateProps } from '../types'
import { MapPin, Calendar, Link as LinkIcon } from 'lucide-react'

export function UserProfileCard({ typography, colors }: TemplateProps) {
  return (
    <section
      className="py-12 px-8"
      style={{ backgroundColor: colors.bgLight, color: colors.text }}
    >
      <div className="max-w-md mx-auto">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: colors.alt + '30' }}
        >
          {/* Cover */}
          <div
            className="h-24"
            style={{ backgroundColor: colors.main }}
          />

          {/* Profile */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-start -mt-10 mb-4">
              <div
                className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold"
                style={{
                  backgroundColor: colors.bgDark,
                  color: colors.textInv,
                  borderColor: colors.bgLight,
                }}
              >
                JD
              </div>
              <button
                className="mt-12 px-4 py-1.5 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
                style={{ borderColor: colors.main, color: colors.main }}
              >
                Edit Profile
              </button>
            </div>

            <h3
              className="text-xl font-bold"
              style={{ fontFamily: typography.h3.font }}
            >
              Jane Doe
            </h3>
            <p
              className="text-sm opacity-60 mb-3"
              style={{ fontFamily: typography.p2.font }}
            >
              @janedoe
            </p>
            <p
              className="mb-4"
              style={{ fontFamily: typography.p2.font }}
            >
              Full-stack developer passionate about building great products. Open source contributor.
            </p>

            <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-4">
              <span className="flex items-center gap-1" style={{ fontFamily: typography.p2.font }}>
                <MapPin className="w-4 h-4" /> San Francisco, CA
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: typography.p2.font }}>
                <LinkIcon className="w-4 h-4" /> janedoe.dev
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: typography.p2.font }}>
                <Calendar className="w-4 h-4" /> Joined Jan 2020
              </span>
            </div>

            <div className="flex gap-6 text-sm">
              <span style={{ fontFamily: typography.p2.font }}>
                <strong>1,234</strong> <span className="opacity-60">Following</span>
              </span>
              <span style={{ fontFamily: typography.p2.font }}>
                <strong>5,678</strong> <span className="opacity-60">Followers</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
