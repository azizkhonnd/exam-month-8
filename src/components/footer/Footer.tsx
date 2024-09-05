import { useEffect, useState } from 'react';
import { BsFacebook } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Flag from 'react-flagkit';
import './Footer.scss';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container'>
      <div className="footer__wrapper">
        <div className='form__items'>
          <form className='form__container'>
            <div className='form__group'>
              <h2 className='form__label'>Узнавайте первыми о распродажах и новинках!</h2>
              <div className='form__input__container'>
                <input className='form__input' type='email' placeholder='Электронная почта' />
                <button className='form__button'>Подписаться</button>
              </div>
              <div className="footer__icons">
                <Link className="footer__link" to='https://www.instagram.com'><AiOutlineInstagram size={22} /></Link>
                <Link className="footer__link" to='https://www.facebook.com'><BsFacebook size={22} /></Link>
              </div>
            </div>
          </form>
        </div>
        <div className='footer__divider'>
          <div>
            <ul className='navbar__list'>
              <li className='navbar__item'><Link className='navbar__link' to='#'>О компании</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Контакты</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Условия использования</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Приложение</Link></li>
            </ul>
          </div>
          <div>
            <ul className='navbar__list'>
              <li className='navbar__item'><Link className='navbar__link' to='#'>О доставке</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Способы оплаты</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Оригинальность продукции</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Обмен и возврат</Link></li>
            </ul>
          </div>
          <div>
            <ul className='navbar__list'>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Статьи</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Новости</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Beauty Club</Link></li>
            </ul>
          </div>
          <div>
            <ul className='navbar__list'>
              <li className='navbar__item'><a className='navbar__link-number' href='tel:88000000000'>+880 000 0000</a></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Вы можете написать нам письмо позвонить нам по телефонам</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Ежедневно с 7:55 до 20:05</Link></li>
              <li className='navbar__item'><Link className='navbar__link' to='#'>Обратный звонок</Link></li>
            </ul>
          </div>
        </div>
        <div className="line"></div>
        <div className="flags">
          MAKEUP GLOBAL
          <Flag country="US" size={20} />
          <Flag country="RU" size={20} />
          <Flag country="FR" size={20} />
          <Flag country="DE" size={20} />
          <Flag country="GB" size={20} />
          <Flag country="IN" size={20} />
          <Flag country="BR" size={20} />
          <Flag country="ES" size={20} />
          <Flag country="CA" size={20} />
          <Flag country="MX" size={20} />
          <Flag country="IT" size={20} />
          <Flag country="JP" size={20} />
          <Flag country="CN" size={20} />
          <Flag country="AR" size={20} />
          <Flag country="AU" size={20} />
          <Flag country="PH" size={20} />
          <Flag country="ID" size={20} />
          <Flag country="MY" size={20} />
          <Flag country="TH" size={20} />
          <Flag country="VN" size={20} />
          <Flag country="TR" size={20} />
          <Flag country="UZ" size={20} />
          <Flag country="KZ" size={20} />
          <Flag country="NG" size={20} />
          <Flag country="KE" size={20} />
          <Flag country="JP" size={20} />
          <Flag country="CN" size={20} />
          <Flag country="AR" size={20} />
          <Flag country="AU" size={20} />
          <Flag country="PH" size={20} />
          <Flag country="ID" size={20} />
          <Flag country="MY" size={20} />
          <Flag country="TH" size={20} />
          <Flag country="ZA" size={20} />
          <Flag country="EG" size={20} />
          <Flag country="PK" size={20} />
          <Flag country="BD" size={20} />
          <Flag country="NP" size={20} />
          <Flag country="MY" size={20} />
          <Flag country="TH" size={20} />
          <Flag country="VN" size={20} />
          <Flag country="TR" size={20} />
        </div>
        <div className="line"></div>
        <div className="copyright">
          <p className="copyright-text">© 2024. Все права защищены.</p>
          <p className="copyright-text">© MAKEUP 2021-2024</p>
        </div>
        {isVisible && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer;
