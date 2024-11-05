'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import React from 'react'

export function BreadcrumbHeader() {
  const pathName = usePathname()
  const paths = pathName === '/' ? [''] : pathName.split('/')

  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === '' ? 'Home' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
