module.exports = {
  content: ['./index.html', './*.tsx', './components/*.tsx'],
  theme: { extend: { colors: {
    paper: 'var(--bg)', surface: 'var(--surface)', soft: 'var(--secondary)',
    ink: 'var(--text)', muted: 'var(--muted)', accent: 'var(--accent)',
    line: 'var(--border)', tint: 'var(--tint)', header: 'var(--bar)',
    highlight: 'var(--highlight)', 'on-accent': 'var(--on-accent)'
  } } }
};
