import React from 'react'

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  return (
    <div className={`basic-card ${className}`}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="basic-card-header">
      {children}
    </div>
  )
}

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  return (
    <h2 className={`basic-card-title ${className}`}>
      {children}
    </h2>
  )
}

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="basic-card-content">
      {children}
    </div>
  )
}
