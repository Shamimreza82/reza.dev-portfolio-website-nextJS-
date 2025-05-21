import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardHome() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,204</p>
        </CardContent>
      </Card>
      {/* more cards… */}
    </section>
  )
}
