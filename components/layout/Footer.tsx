export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} College Application Portal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

