"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/app/contexts/language-context"

export function WholesaleTerms() {
  const { t } = useLanguage()

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">{t("terms.title")}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600">{t("terms.discount65")}</CardTitle>
              <CardDescription>{t("terms.minOrder400")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t("terms.desc65")}</p>
            </CardContent>
          </Card>
          <Card className="border-pink-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-pink-600">{t("terms.discount70")}</CardTitle>
              <CardDescription>{t("terms.minOrder2000")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t("terms.desc70")}</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600">{t("terms.discount73")}</CardTitle>
              <CardDescription>{t("terms.premiumTier")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t("terms.desc73")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
