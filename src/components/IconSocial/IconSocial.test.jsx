import { render } from '@testing-library/react';
import React from 'react';

import IconSocial from './IconSocial';

describe('IconSocial', () => {
  it('renders with the correct props', () => {
    const link = 'https://example.com';
    const alt = 'Example Link';
    const { getByLabelText } = render(
      <IconSocial link={link} alt={alt}>
        <span>Example Child</span>
      </IconSocial>
    );

    const iconSocialLink = getByLabelText(alt);
    expect(iconSocialLink).toHaveAttribute('href', link);
    expect(iconSocialLink.className).toContain('link');
    expect(iconSocialLink).toHaveTextContent('Example Child');
    expect(iconSocialLink).toHaveAttribute('target', '_blank');
    expect(iconSocialLink).toHaveAttribute('rel', 'noreferrer');
  });
});
