

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      {/* Main column */}
      <div className="relative flex flex-col flex-1">
        {/* Sticky top navigation */}
    
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
