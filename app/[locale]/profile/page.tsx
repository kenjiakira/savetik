"use client"

import * as React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ChevronLeft, Crown, User, Key, CreditCard, History, LogOut, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { LocalizedLink } from "@/lib/localized-links"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const t = useI18n()
  const router = useRouter()
  const { data: session, status, update } = useSession()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (session?.user) {
      setName(session.user.name || "")
    }
  }, [session, status, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      // Update session data
      await update({
        ...session,
        user: {
          ...session?.user,
          name,
        },
      })

      setSuccess("Profile updated successfully")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  const SecurityTabContent = () => {
    const t = useI18n()
    const [sessions, setSessions] = useState<any[]>([])
    const [loadingSession, setLoadingSession] = useState(false)
    const [sessionError, setSessionError] = useState<string | null>(null)
    const [revokingSession, setRevokingSession] = useState<string | null>(null)
    const [revokingAll, setRevokingAll] = useState(false)
    const { toast } = useToast()

    const fetchSessions = useCallback(async () => {
      try {
        setLoadingSession(true)
        setSessionError(null)
        const response = await fetch('/api/user/sessions')
        
        if (!response.ok) {
          throw new Error('Failed to fetch sessions')
        }
        
        const data = await response.json()
        setSessions(data.sessions)
      } catch (error: any) {
        setSessionError(error.message || 'Failed to load sessions')
        toast({
          variant: 'destructive',
          title: t('common.error'),
          description: t('profile.security.errorFetchingSessions'),
        })
      } finally {
        setLoadingSession(false)
      }
    }, [t, toast])

    const handleRevokeSession = async (sessionId: string) => {
      try {
        setRevokingSession(sessionId)
        const response = await fetch('/api/user/sessions/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to revoke session')
        }
        
        if (data.isCurrentSession) {
          window.location.href = '/login'
          return
        }
        
        setSessions(sessions.filter(session => session.id !== sessionId))
        toast({
          title: t('profile.security.sessionRevoked'),
          description: t('profile.security.sessionRevokedDescription'),
        })
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: t('common.error'),
          description: error.message || t('profile.security.errorRevokingSession'),
        })
      } finally {
        setRevokingSession(null)
      }
    }

    const handleRevokeAllSessions = async () => {
      try {
        setRevokingAll(true)
        const response = await fetch('/api/user/sessions/revoke-all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to revoke all sessions')
        }
        
        setSessions(sessions.filter(session => session.isCurrentSession))
        toast({
          title: t('profile.security.allSessionsRevoked'),
          description: t('profile.security.allSessionsRevokedDescription'),
        })
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: t('common.error'),
          description: error.message || t('profile.security.errorRevokingAllSessions'),
        })
      } finally {
        setRevokingAll(false)
      }
    }

    const formatUserAgent = (userAgent: string) => {
      const isMobile = /mobile|android|ios|iphone|ipad/i.test(userAgent.toLowerCase())
      const browser = /chrome|firefox|safari|edge|opera/i.exec(userAgent.toLowerCase())
      let device = isMobile ? 'Mobile' : 'Desktop'
      let browserName = browser ? browser[0].charAt(0).toUpperCase() + browser[0].slice(1) : 'Unknown'
      
      return `${device} - ${browserName}`
    }

    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) {
          return t('profile.security.today')
        } else if (diffDays === 1) {
          return t('profile.security.yesterday')
        } else if (diffDays < 7) {
          return t('profile.security.daysAgo', { days: diffDays })
        } else {
          return date.toLocaleDateString()
        }
      } catch (e) {
        return dateString || 'N/A'
      }
    }

    useEffect(() => {
      fetchSessions()
    }, [fetchSessions])

    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.security.title")}</CardTitle>
          <CardDescription>{t("profile.security.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">{t("profile.security.changePassword")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("profile.security.passwordNote")}</p>
              <Button asChild>
                <LocalizedLink href="/reset-password">{t("profile.security.resetPassword")}</LocalizedLink>
              </Button>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t("profile.security.sessions")}</h3>
                {sessions.length > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handleRevokeAllSessions} 
                    disabled={revokingAll || loadingSession}
                  >
                    {revokingAll ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {t("profile.security.revokeAllSessions")}
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{t("profile.security.sessionsNote")}</p>
              
              {loadingSession ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : sessionError ? (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{sessionError}</AlertDescription>
                </Alert>
              ) : sessions.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  {t("profile.security.noSessions")}
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((sessionData) => (
                    <div 
                      key={sessionData.id} 
                      className={`bg-muted/50 rounded-lg p-4 border ${
                        sessionData.isCurrentSession ? 'border-primary' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {formatUserAgent(sessionData.userAgent)}
                            {sessionData.isCurrentSession && (
                              <Badge variant="outline" className="ml-2 bg-primary/20 text-primary border-primary/20">
                                {t("profile.security.currentSession")}
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("profile.security.lastActive")}: {formatDate(sessionData.lastUsedAt)}
                          </p>
                        </div>
                        <Button
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRevokeSession(sessionData.id)}
                          disabled={!!revokingSession}
                          className="text-destructive hover:text-destructive"
                        >
                          {revokingSession === sessionData.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            t("profile.security.revokeSession")
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <LocalizedLink href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t("common.home")}
              </LocalizedLink>
            </Button>
            <Logo />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={session?.user.image || ""} alt={session?.user.name || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {session?.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{session?.user.name}</h2>
                    <p className="text-sm text-muted-foreground">{session?.user.email}</p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          session?.user.subscription === "premium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        }`}
                      >
                        {session?.user.subscription === "premium" ? (
                          <>
                            <Crown className="mr-1 h-3 w-3" />
                            {t("common.premium")}
                          </>
                        ) : (
                          t("common.free")
                        )}
                      </span>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <LocalizedLink href="#account">
                        <User className="mr-2 h-4 w-4" />
                        {t("profile.nav.account")}
                      </LocalizedLink>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <LocalizedLink href="#security">
                        <Key className="mr-2 h-4 w-4" />
                        {t("profile.nav.security")}
                      </LocalizedLink>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <LocalizedLink href="#subscription">
                        <CreditCard className="mr-2 h-4 w-4" />
                        {t("profile.nav.subscription")}
                      </LocalizedLink>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <LocalizedLink href="#history">
                        <History className="mr-2 h-4 w-4" />
                        {t("profile.nav.history")}
                      </LocalizedLink>
                    </Button>
                    <Separator className="my-2" />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("common.logout")}
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="account">
                    <User className="h-4 w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">{t("profile.nav.account")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Key className="h-4 w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">{t("profile.nav.security")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="subscription">
                    <CreditCard className="h-4 w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">{t("profile.nav.subscription")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="history">
                    <History className="h-4 w-4 mr-2 md:hidden" />
                    <span className="hidden md:inline">{t("profile.nav.history")}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("profile.account.title")}</CardTitle>
                      <CardDescription>{t("profile.account.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                            <AlertDescription>{success}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            {t("profile.account.name")}
                          </label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            {t("profile.account.email")}
                          </label>
                          <Input id="email" value={session?.user.email || ""} disabled />
                          <p className="text-xs text-muted-foreground">{t("profile.account.emailNote")}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="uid" className="text-sm font-medium">
                            {t("profile.account.uid") || "User ID"}
                          </label>
                          <Input id="uid" value={session?.user.uid || ""} disabled />
                          <p className="text-xs text-muted-foreground">{t("profile.account.uidNote") || "Your unique 9-digit user identifier"}</p>
                        </div>

                        <Button type="submit" disabled={loading}>
                          {loading ? t("common.saving") : t("common.save")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <SecurityTabContent />
                </TabsContent>

                <TabsContent value="subscription">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("profile.subscription.title")}</CardTitle>
                      <CardDescription>{t("profile.subscription.description")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {session?.user.subscription === "premium" ? t("common.premium") : t("common.free")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session?.user.subscription === "premium"
                                ? t("profile.subscription.renewalDate", { date: formatDate(new Date()) })
                                : t("profile.subscription.freePlan")}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              session?.user.subscription === "premium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {session?.user.subscription === "premium"
                              ? t("profile.subscription.active")
                              : t("profile.subscription.free")}
                          </span>
                        </div>
                      </div>

                      {session?.user.subscription === "premium" ? (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">{t("profile.subscription.features")}</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                              {t("home.upgrade.features.batch")}
                            </li>
                            <li className="flex items-center">
                              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                              {t("home.upgrade.features.noAds")}
                            </li>
                            <li className="flex items-center">
                              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                              {t("home.upgrade.features.priority")}
                            </li>
                            <li className="flex items-center">
                              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                              {t("home.upgrade.features.support")}
                            </li>
                          </ul>

                          <div className="pt-4">
                            <Button variant="outline" className="w-full">
                              {t("profile.subscription.cancelSubscription")}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">{t("profile.subscription.upgradeToPremium")}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t("profile.subscription.upgradeDescription")}
                          </p>
                          <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-amber-500">
                            <LocalizedLink href="/pricing">
                              <Crown className="mr-2 h-4 w-4" />
                              {t("profile.subscription.upgrade")}
                            </LocalizedLink>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("profile.history.title")}</CardTitle>
                      <CardDescription>{t("profile.history.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {session?.user.subscription === "premium" ? (
                        <div className="space-y-4">
                          <div className="rounded-lg border overflow-hidden">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                  >
                                    {t("profile.history.date")}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                  >                            {t("profile.history.content")}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                  >
                                    {t("profile.history.type")}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                  >
                                    {t("profile.history.status")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-background divide-y divide-border">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {new Date().toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded bg-muted flex-shrink-0 mr-2"></div>
                                      <span className="truncate max-w-[150px]">TikTok Video #12345</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">Video</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {t("profile.history.completed")}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {new Date(Date.now() - 86400000).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded bg-muted flex-shrink-0 mr-2"></div>
                                      <span className="truncate max-w-[150px]">TikTok Slideshow #67890</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">Images</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {t("profile.history.completed")}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <History className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">{t("profile.history.premiumFeature")}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t("profile.history.premiumFeatureDescription")}
                          </p>
                          <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-500">
                            <LocalizedLink href="/pricing">
                              <Crown className="mr-2 h-4 w-4" />
                              {t("profile.subscription.upgrade")}
                            </LocalizedLink>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
