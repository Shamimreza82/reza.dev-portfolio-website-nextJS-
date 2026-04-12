import React from "react";

const LayoutProvider = ({ children }: {children: React.ReactNode}) => {
  return (
    <div>
      {/* Navbar */}

      {/* Page Content */}
      <main className="p-6">{children}</main>

      {/* Footer */}
    </div>
  );
};

export default LayoutProvider;
