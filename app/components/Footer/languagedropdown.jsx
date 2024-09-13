import { useState } from 'react';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import Dropdown from '@/app/components/Animation/dropdown'

const LanguageDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Türkçe');

    const languages = [
        { code: 'en', label: 'İngilizce', flag: '🇬🇧' },
        { code: 'de', label: 'Almanca', flag: '🇩🇪' },
        { code: 'fr', label: 'Fransızca', flag: '🇫🇷' },
        { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (language) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        // Dil değişimi için burada bir aksiyon tetiklenebilir.
    };

    return (
        <div className="relative inline-block text-left">
            <Dropdown isOpen={isOpen}>
                <div className={`min-w-44 h-fit absolute border border-stone-900/20 -top-36 right-0 rounded-md shadow-xl bg-main`}>
                    <div className='w-full '>
                        {
                            languages.map((lang) => (
                                <li
                                    key={lang.code}
                                    onClick={() => selectLanguage(lang.label)}
                                    className="flex items-center px-4 py-2 font-dosis  cursor-pointer hover:bg-black/10 transition-all"
                                >
                                    <span className="mr-2">{lang.flag}</span> {lang.label}
                                </li>
                            ))
                        }


                    </div>
                </div>
            </Dropdown>

            {/* {isOpen && (
                <div className="absolute left-0 z-10 w-56 mt-2 -top-40 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg">
                    <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {languages.map((lang) => (
                            <li
                                key={lang.code}
                                onClick={() => selectLanguage(lang.label)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            >
                                <span className="mr-2">{lang.flag}</span> {lang.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}
            <div>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-full px-4 py-2 font-dosis text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                    {selectedLanguage}
                    <span className="ml-2 text-xl ">{isOpen ? <RxCaretUp /> : <RxCaretDown />}</span>
                </button>
            </div>
        </div>
    );
};

export default LanguageDropdown;
