/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            maxWidth: 'none',
            h1: {
              color: '#1a202c',
              fontWeight: '800',
              fontSize: '2.25em',
              marginBottom: '1em',
            },
            h2: {
              color: '#2d3748',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: '#2d3748',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: '#3182ce',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
              '&::before': {
                content: '""',
                width: '0.5em',
                height: '0.5em',
                borderRadius: '50%',
                backgroundColor: '#cbd5e0',
                position: 'absolute',
                left: '0.25em',
                top: '0.6875em',
              },
            },
            'ol > li': {
              counterIncrement: 'list-counter',
              position: 'relative',
              paddingLeft: '1.75em',
              '&::before': {
                content: 'counter(list-counter) "."',
                position: 'absolute',
                fontWeight: '400',
                left: '0',
                color: '#718096',
              },
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#4a5568',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#edf2f7',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
            code: {
              color: '#805ad5',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            pre: {
              color: '#e2e8f0',
              backgroundColor: '#2d3748',
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.375rem',
              paddingTop: '0.8571429em',
              paddingRight: '1.1428571em',
              paddingBottom: '0.8571429em',
              paddingLeft: '1.1428571em',
            },
          },
        },
        dark: {
          css: {
            color: '#e2e8f0',
            h1: {
              color: '#f7fafc',
            },
            h2: {
              color: '#f7fafc',
            },
            h3: {
              color: '#f7fafc',
            },
            blockquote: {
              color: '#e2e8f0',
              borderLeftColor: '#2d3748',
            },
            a: {
              color: '#90cdf4',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}