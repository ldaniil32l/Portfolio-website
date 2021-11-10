const disabledScroll = () => {

    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.body.scrollPosition = window.scrollY;

    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${widthScroll}px;
    `;
}

const enabledScroll = () => {
    document.body.style.cssText = 'position: relative;';
    window.scroll({top: document.body.scrollPosition});
}

{ // модальное окно
    const presentOrderBtn = document.querySelector('.present__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClose = document.querySelector('.modal__close');

    pageOverlayModal.classList.add('page__overlay_modal_open');
    pageOverlayModal.classList.remove('page__overlay_modal_open');

    const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk = 'medium') => {

        let opacity = 0;

        const speed = {
            slow: 0.02,
            medium: 0.05,
            fast: 0.1,
        };

        const openModal = () => {
            disabledScroll();
            modal.classList.add(openSelector);

            const anim = () => {
                opacity += speed[sk];
                modal.style.opacity = opacity;
                if (opacity < 1) requestAnimationFrame(anim);
            };
            requestAnimationFrame(anim);
        };

        const closeModal = () => {
            enabledScroll();
            const anim = () => {
                opacity -= speed[sk];
                modal.style.opacity = opacity;
                if (opacity > 0) {
                    requestAnimationFrame(anim);
                } else {
                    modal.classList.remove(openSelector);
                }
            };
            requestAnimationFrame(anim);
        };

        openBtn.addEventListener('click', openModal);

        closeTrigger.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        })
    };

    handlerModal(
        presentOrderBtn,
        pageOverlayModal,
        'page__overlay_modal_open',
        modalClose
    );
}

{ // бургер-меню

    const headerContactsBurger = document.querySelector('.header__contacts-burger');
    const headerContacts = document.querySelector('.header__contacts');

    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', () => {
            if (menu.classList.contains(openSelector)) {
                menu.style.height = '';
                menu.classList.remove(openSelector);
            } else {
                menu.style.height = menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }
        })
    };

    handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');

}