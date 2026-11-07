import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-slate-100 text-slate-800">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">😵</div>
          <h1 className="text-xl font-bold">Terjadi kesalahan tak terduga</h1>
          <p className="text-sm text-slate-500">Data Anda tetap aman di perangkat. Silakan muat ulang halaman.</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white" onClick={() => window.location.reload()}>Muat ulang</button>
        </div>
      </div>
    );
  }
}
