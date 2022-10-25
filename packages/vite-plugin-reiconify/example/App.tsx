/// <reference types="vite/client" />
/// <reference types="vite-plugin-reiconify/client" />
import React from 'react'
import checkUrl from './icons/check.svg'
import checkSVG from './icons/check.svg?raw'
import CheckIcon from './icons/check.svg?react'

const svgIcons = import.meta.glob<React.FC<React.SVGProps<SVGElement>>>(
  './icons/**/*.svg',
  {
    eager: true,
    import: 'default',
    query: 'react',
  }
)

export default function App() {
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: 600,
      }}
    >
      <section>
        <pre>
          <code>{`import checkUrl from './icons/check.svg'`}</code>
        </pre>
        <pre>
          <code>{checkUrl}</code>
        </pre>
      </section>

      <hr />

      <section>
        <pre>
          <code>{`import checkSVG from './icons/check.svg'`}</code>
        </pre>
        <pre>
          <code>{checkSVG}</code>
        </pre>
      </section>

      <hr />

      <section>
        <pre>
          <code>{`import CheckIcon from './icons/check.svg'`}</code>
        </pre>
        <pre>
          <CheckIcon />
        </pre>
      </section>

      <hr />

      <section>
        <pre>
          <code>{`const svgIcons = import.meta.glob('./icons/**/*.svg', {eager: true,import: 'default',query: 'react',})`}</code>
        </pre>
        <pre>
          {Object.entries(svgIcons).map(([name, Icon]) => (
            <div key={name}>
              {name}: <Icon center />
            </div>
          ))}
        </pre>
      </section>
    </div>
  )
}
