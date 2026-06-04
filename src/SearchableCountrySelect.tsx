import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import * as flags from 'country-flag-icons/react/3x2';
import { getCountryCallingCode } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';

type CountryCode = string;

interface SearchableCountrySelectProps {
  value?: CountryCode;
  onChange: (value?: CountryCode) => void;
  options: Array<{ value?: CountryCode; label?: string }>;
  labels: Record<string, string>;
  disabled?: boolean;
}

export function SearchableCountrySelect({
  value,
  onChange,
  options,
  labels,
  disabled
}: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Defensively resolve flags and labels to prevent runtime undefined access
  const resolvedFlags = flags ? ((flags as any).default || flags) : {};
  const countryLabels = labels || en || {};

  const selectedCountry = value;
  const SelectedFlag = selectedCountry ? resolvedFlags[selectedCountry as keyof typeof resolvedFlags] : null;
  
  let selectedDialCode = '';
  if (selectedCountry) {
    try {
      selectedDialCode = `+${getCountryCallingCode(selectedCountry as any)}`;
    } catch (e) {
      console.warn('Could not get calling code for country', selectedCountry);
    }
  }

  // Filter options based on search query (name, dial code, or country code)
  const filteredOptions = (options || []).filter((opt) => {
    if (!opt.value) return false;
    const countryName = countryLabels[opt.value] || opt.label || '';
    let dialCode = '';
    try {
      dialCode = getCountryCallingCode(opt.value as any);
    } catch (e) {
      // Ignored
    }
    const query = search.toLowerCase();
    return (
      countryName.toLowerCase().includes(query) ||
      dialCode.includes(query) ||
      opt.value.toLowerCase().includes(query)
    );
  });

  return (
    <div className="custom-country-select-container" ref={dropdownRef}>
      <button
        type="button"
        className="custom-country-select-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="selected-flag-wrapper">
          {SelectedFlag ? <SelectedFlag title={selectedCountry || 'Country'} /> : <span className="flag-placeholder">🌐</span>}
        </span>
        <span className="selected-dial-code">{selectedDialCode || 'Dial'}</span>
        <ChevronDown size={14} className={`select-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="custom-country-dropdown-menu">
          <div className="dropdown-search-wrapper">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              className="dropdown-search-input"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="dropdown-options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                if (!opt.value) return null;
                const CountryFlag = resolvedFlags[opt.value as keyof typeof resolvedFlags];
                let dialCode = '';
                try {
                  dialCode = getCountryCallingCode(opt.value as any);
                } catch (e) {
                  // Ignored
                }
                const countryName = countryLabels[opt.value] || opt.label || opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`dropdown-option-item ${value === opt.value ? 'selected' : ''}`}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch('');
                    }}
                  >
                    <span className="option-flag">
                      {CountryFlag ? <CountryFlag title={opt.value} /> : null}
                    </span>
                    <span className="option-name">{countryName}</span>
                    <span className="option-dial">+{dialCode}</span>
                  </button>
                );
              })
            ) : (
              <div className="no-options-found">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableCountrySelect;
