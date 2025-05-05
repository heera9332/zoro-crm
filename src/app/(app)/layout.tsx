import "@/app/globals.css";

export default function Page({ children }) {
  return (
    <html>
      <head></head>
      <body>
        {children}
      </body>
    </html>
  );
}
