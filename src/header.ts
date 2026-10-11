const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const closeButton = document.querySelector<HTMLButtonElement>('.menu-close');
if (toggle && menu && closeButton) {
  const closeMenu = () => menu.close();
  toggle.addEventListener('click', () => {
    menu.showModal();
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  });
  closeButton.addEventListener('click', closeMenu);
  menu
    .querySelectorAll<HTMLAnchorElement>('a')
    .forEach(link => link.addEventListener('click', closeMenu));
  menu.addEventListener('close', () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
  window.matchMedia('(min-width: 1440px)').addEventListener('change', event => {
    if (event.matches && menu.open) closeMenu();
  });
}
