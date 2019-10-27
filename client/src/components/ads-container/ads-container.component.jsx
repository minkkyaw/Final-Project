import React from 'react';

import './ads-container.styles.scss';

const AdsContainer = () => (
  <div class="main-right-container">
    <div class="ad-container">
      <img id="ad-1" src="/images/ads/ad-3.jpg" alt="ads" />
      <div class="caption" id="caption3">
        <p>Ad</p>
      </div>
    </div>
    <div class="ad-container">
      <img id="ad-2" src="/images/ads/ad-4.png" alt="ads" />
      <div class="caption" id="caption4">
        <p>Ad</p>
      </div>
    </div>
  </div>
)

export default AdsContainer;