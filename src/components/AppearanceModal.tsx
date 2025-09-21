'use client';

import { useState, useEffect } from 'react';
import { X, Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';

type ThemeMode = 'system' | 'light' | 'dark';
type AppearanceSettings = {
  themeMode: ThemeMode;
  backgroundEnabled: boolean;
  chatColorEnabled: boolean;
};

const themeOptions = [
  {
    key: 'system' as const,
    text: 'System preference',
    caption: 'Follows OS theme',
  },
  {
    key: 'light' as const,
    text: 'Light mode',
    caption: 'Always light',
  },
  {
    key: 'dark' as const,
    text: 'Dark',
    caption: 'Always dark',
  },
];

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AppearanceSettings) => void;
}

export function AppearanceModal({ isOpen, onClose, onSave }: AppearanceModalProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [backgroundEnabled, setBackgroundEnabled] = useState(false);
  const [chatColorEnabled, setChatColorEnabled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [setTheme])

  useEffect(() => {
    if (typeof window === 'undefined' || !resolvedTheme) return

    window.localStorage.setItem('theme', resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    if (isOpen) {
      // Load settings from localStorage
      const saved = localStorage.getItem('appearance-settings');
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          setThemeMode(settings.themeMode || 'system');
          setBackgroundEnabled(settings.backgroundEnabled || false);
          setChatColorEnabled(settings.chatColorEnabled || false);
        } catch (err) {
          console.warn('Failed to parse appearance settings', err);
        }
      } else {
        // If no saved settings, sync with current theme
        if (resolvedTheme) {
          setThemeMode(resolvedTheme as ThemeMode);
        }
      }
    }
  }, [isOpen, resolvedTheme]);

  const handleSave = () => {
    const settings: AppearanceSettings = {
      themeMode,
      backgroundEnabled,
      chatColorEnabled,
    };

    // Save to localStorage
    localStorage.setItem('appearance-settings', JSON.stringify(settings));

    // Apply theme using next-themes
    setTheme(themeMode);

    onSave(settings);
    onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div key="appearance-modal" className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              duration: 0.25,
              bounce: 0
              // mass: 1
            }}
            className="relative w-full max-w-[840px] mx-4 max-h-[84vh] overflow-hidden rounded-[16px] border-2 border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.16)] dark:bg-[#0F1422] dark:border-[rgba(255,255,255,0.1)]">
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="flex flex-row items-center gap-1 text-[20px] font-semibold text-[#111827] dark:text-[#E5E7EB]">
                <Palette className='w-6 h-6'/>
                Appearance
              </h2>
            </div>

            {/* Theme Chooser */}
            <div className="space-y-4">
              <h3 className="text-[16px] font-medium text-[#111827] dark:text-[#E5E7EB]">
                Theme
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {themeOptions.map((option) => {
                  // Determine the preview theme based on the option
                  const getPreviewTheme = () => {
                    if (option.key === 'light') return 'light';
                    if (option.key === 'dark') return 'dark';
                    if (option.key === 'system') {
                      // For system, show what the system preference would be
                      if (typeof window !== 'undefined') {
                        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      }
                      return 'light'; // fallback
                    }
                    return 'light';
                  };

                  const previewTheme = getPreviewTheme();
                  const isDark = previewTheme === 'dark';

                  return (
                    <button
                      key={option.key}
                      onClick={() => setThemeMode(option.key)}
                      className={cn(
                        'group relative p-2 rounded-[14px] border transition-all',
                        'bg-[#F9FAFB] border-[#E5E7EB] dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.08)]',
                        'hover:shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
                        themeMode === option.key && 'ring-2 ring-[#6366F1] ring-offset-2'
                      )}
                    >
                      {/* <div className='absolute w-full h-full scale-[1.05] origin-center rounded-[14px] border-2 border-blue-500'/> */}
                      {/* Preview */}
                      <div className={cn(
                        "h-[140px] w-full rounded-lg border p-2",
                        isDark 
                          ? "bg-[#1F2937] border-[rgba(255,255,255,0.12)]" 
                          : "bg-white border-[#E5E7EB]"
                      )}>
                        <div className="space-y-2">
                          {/* Header bar */}
                          <div className={cn(
                            "h-4 rounded",
                            isDark 
                              ? "bg-[rgba(255,255,255,0.08)]" 
                              : "bg-[#F3F4F6]"
                          )} />
                          {/* Sidebar */}
                          <div className="flex gap-2">
                            <div className={cn(
                              "w-11 h-12 rounded",
                              isDark 
                                ? "bg-[rgba(255,255,255,0.08)]" 
                                : "bg-[#F3F4F6]"
                            )} />
                            <div className="flex-1 space-y-1">
                              <div className={cn(
                                "h-3 rounded",
                                isDark 
                                  ? "bg-[rgba(255,255,255,0.12)]" 
                                  : "bg-[#E5E7EB]"
                              )} />
                              <div className={cn(
                                "h-3 rounded w-3/4",
                                isDark 
                                  ? "bg-[rgba(255,255,255,0.12)]" 
                                  : "bg-[#E5E7EB]"
                              )} />
                              <div className={cn(
                                "h-3 rounded w-1/2",
                                isDark 
                                  ? "bg-[rgba(255,255,255,0.12)]" 
                                  : "bg-[#E5E7EB]"
                              )} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Label */}
                      <div className="mt-3 text-center">
                        <div className="text-[14px] font-medium text-[#111827] dark:text-[#E5E7EB]">
                          {option.text}
                        </div>
                        <div className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">
                          {option.caption}
                        </div>
                      </div>

                      {/* Selection indicator */}
                      {themeMode === option.key && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#6366F1] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-4">
              <h3 className="text-[16px] font-medium text-[#111827] dark:text-[#E5E7EB]">
                Customization
              </h3>

              <div className="space-y-2">
                {/* Background option */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[16px] font-medium text-[#111827] dark:text-[#E5E7EB]">
                      Background
                    </div>
                    <div className="text-[14px] text-[#6B7280] dark:text-[#9CA3AF]">
                      Customize your background
                    </div>
                  </div>
                  <Switch
                    checked={backgroundEnabled}
                    onChange={setBackgroundEnabled}
                    disabled={false}
                  />
                </div>

                <div className="h-px bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.08)]" />

                {/* Chat Color option */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-[16px] font-medium text-[#111827] dark:text-[#E5E7EB]">
                      Chat Color
                    </div>
                    <div className="text-[14px] text-[#6B7280] dark:text-[#9CA3AF]">
                      Customize your chat
                    </div>
                  </div>
                  <Switch
                    checked={chatColorEnabled}
                    onChange={setChatColorEnabled}
                    disabled={false}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={onClose}
                className="px-4 py-2 h-9 rounded-[12px] border border-[rgba(17,24,39,0.06)] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] text-[#111827] dark:text-[#E5E7EB] text-[14px] font-medium hover:bg-[#E5E7EB] dark:hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 h-9 rounded-[12px] bg-[#111827] dark:bg-[#E5E7EB] text-white dark:text-[#0B0F1A] text-[14px] font-medium hover:bg-black dark:hover:bg-white transition-colors"
              >
                Save changes
              </button>
            </div>
           </div>
         </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2',
        checked
          ? 'bg-[#111827] dark:bg-[#E5E7EB]'
          : 'bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.08)]',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={cn(
          'inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.20)] transition-transform',
          checked ? 'translate-x-6' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}
