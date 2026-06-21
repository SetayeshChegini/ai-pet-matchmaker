export default function Icon({ name, size = 22 }) {
  const paths = {
    paw: <><circle cx="6.6" cy="8" r="2.2"/><circle cx="12" cy="5.5" r="2.2"/><circle cx="17.4" cy="8" r="2.2"/><path d="M12 10.2c-3.7 0-6.7 2.9-6.7 6.1 0 1.7 1.3 2.7 2.9 2.7 1.3 0 2.4-.7 3.8-.7s2.5.7 3.8.7c1.6 0 2.9-1 2.9-2.7 0-3.2-3-6.1-6.7-6.1Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    sparkle: <><path d="m12 3 1.1 3.4a5 5 0 0 0 3.2 3.2L20 11l-3.7 1.3a5 5 0 0 0-3.2 3.2L12 19l-1.1-3.5a5 5 0 0 0-3.2-3.2L4 11l3.7-1.4a5 5 0 0 0 3.2-3.2L12 3Z"/></>,
    stars: <><path d="m9 3 .8 2.3A3 3 0 0 0 11.7 7L14 8l-2.3.9a3 3 0 0 0-1.9 1.8L9 13l-.8-2.3a3 3 0 0 0-1.9-1.8L4 8l2.3-1a3 3 0 0 0 1.9-1.7L9 3Z"/><path d="m17 12 .6 1.7a2 2 0 0 0 1.2 1.2l1.7.6-1.7.6a2 2 0 0 0-1.2 1.2L17 20l-.6-1.7a2 2 0 0 0-1.2-1.2l-1.7-.6 1.7-.6a2 2 0 0 0 1.2-1.2L17 12Z"/></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7.1a3 3 0 0 0-.4 5.6A3.2 3.2 0 0 0 9.5 17"/><path d="M14.5 4.5A3 3 0 0 1 19 7.1a3 3 0 0 1 .4 5.6 3.2 3.2 0 0 1-4.9 4.3"/><path d="M9.5 4.5V19M14.5 4.5V19M7 9h2.5M14.5 9H17M7.5 14h2M14.5 14h2"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.5 2.8 7.7 7 10 4.2-2.3 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 22l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/></>,
    building: <><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    trees: <><path d="m7 3-4 7h3l-3 6h8l-3-6h3L7 3ZM17 6l-3 6h2l-2 5h7l-3-5h2l-3-6ZM7 16v5M17 17v4"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    moon: <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z"/>,
    coffee: <><path d="M5 8h12v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z"/><path d="M17 10h1a3 3 0 0 1 0 6h-2M8 3v2M12 3v2"/></>,
    balance: <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7ZM17 7l-4 7h8l-4-7ZM8 21h8"/></>,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
    badge: <><circle cx="12" cy="9" r="6"/><path d="m8 14-1 7 5-3 5 3-1-7"/><path d="m10 9 1.3 1.3L14 7.5"/></>,
    feather: <><path d="M20 4c-5 0-12 2-14 10l-2 6 6-2c8-2 10-9 10-14Z"/><path d="m6 18 9-9"/></>,
    brush: <><path d="m14 4 6 6-8 8-6-6 8-8Z"/><path d="M9 15c-3 0-5 2-5 5 3 0 5-2 5-5Z"/></>,
    scissors: <><circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="m8.5 8.5 11 6M8.5 15.5l11-6"/></>,
    cat: <><path d="M6 8 5 3l5 3h4l5-3-1 5a8 8 0 1 1-12 0Z"/><path d="M9 13h.01M15 13h.01M10 16h4M4 13H1M20 13h3"/></>,
    dog: <><path d="M7 7 3 5v6l3 2M17 7l4-2v6l-3 2"/><path d="M6 10a6 6 0 0 1 12 0v4a6 6 0 0 1-12 0v-4Z"/><path d="M9 12h.01M15 12h.01M10 16h4"/></>,
    rabbit: <><path d="M9 8C6 3 7 1 9 2c2 1 2 5 2 6M15 8c3-5 2-7 0-6-2 1-2 5-2 6"/><circle cx="12" cy="14" r="6"/><path d="M10 13h.01M14 13h.01M10 17h4"/></>,
  }

  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] || paths.sparkle}
    </svg>
  )
}

