import React from 'react';
import { Button } from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white text-[#09090b]">
          <div className="max-w-md w-full p-8 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] text-center space-y-4 shadow-sm">
            <div className="h-14 w-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#09090b]">
              Something went unexpected
            </h2>
            <p className="text-xs text-[#71717a] leading-relaxed">
              We encountered an issue rendering this section. Please reload the page to restore the storefront experience.
            </p>
            {this.state.error?.message && (
              <pre className="text-[11px] font-mono text-left bg-white p-3 rounded-lg border border-[#e4e4e7] text-red-600 overflow-x-auto">
                {this.state.error.message}
              </pre>
            )}
            <div className="pt-2">
              <Button variant="primary" size="md" onClick={this.handleReload} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" /> Reload Storefront
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
