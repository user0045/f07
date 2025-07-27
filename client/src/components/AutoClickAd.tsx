import { useEffect } from 'react';

interface AutoClickAdProps {
  pageType: 'details' | 'player';
}

const AutoClickAd: React.FC<AutoClickAdProps> = ({ pageType }) => {
  useEffect(() => {
    // Auto-click functionality with realistic timing and positioning
    const performAutoClick = () => {
      const delay = Math.random() * 8000 + 3000; // 3-11 seconds (longer delay for real ads)

      setTimeout(() => {
        const adContainerIds = pageType === 'details' 
          ? ['details-ad-1', 'details-ad-2', 'details-ad-3']
          : ['player-ad-2', 'player-ad-3', 'player-ad-4'];

        // Find available ads with actual content
        const availableAds = adContainerIds.filter(id => {
          const container = document.getElementById(id);
          if (!container) return false;

          // Check for iframe elements (real ads load as iframes)
          const iframes = container.querySelectorAll('iframe');
          const hasAdScript = container.querySelector('script[src*="highperformanceformat.com"]') || 
                            container.querySelector('script[src*="profitableratecpm.com"]');
          
          return iframes.length > 0 || hasAdScript;
        });

        if (availableAds.length > 0) {
          const randomAdId = availableAds[Math.floor(Math.random() * availableAds.length)];
          const adContainer = document.getElementById(randomAdId);

          if (adContainer) {
            // Find iframe elements within the ad (real ads load as iframes)
            const iframeElements = adContainer.querySelectorAll('iframe');

            if (iframeElements.length > 0) {
              const randomIframe = iframeElements[Math.floor(Math.random() * iframeElements.length)] as HTMLElement;

              // Calculate random position within the iframe (center area)
              const rect = randomIframe.getBoundingClientRect();
              const x = rect.left + rect.width * (0.3 + Math.random() * 0.4);
              const y = rect.top + rect.height * (0.3 + Math.random() * 0.4);

              // Create realistic mouse event on iframe
              const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y,
                button: 0
              });

              console.log(`Auto-clicking ad iframe in ${randomAdId}`);
              randomIframe.dispatchEvent(clickEvent);

              // Also try clicking on the container
              setTimeout(() => {
                const containerRect = adContainer.getBoundingClientRect();
                const containerClickEvent = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true,
                  clientX: containerRect.left + containerRect.width / 2,
                  clientY: containerRect.top + containerRect.height / 2,
                  button: 0
                });
                adContainer.dispatchEvent(containerClickEvent);
              }, 100);

              } else {
              // Fallback: click on container itself if no iframes found yet
              const rect = adContainer.getBoundingClientRect();
              const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
              });
              console.log(`Auto-clicking ad container ${randomAdId}`);
              adContainer.dispatchEvent(clickEvent);
            }
          }
        }
      }, delay);
    };

    // Start auto-clicking after ads have time to load
    const initTimer = setTimeout(performAutoClick, 5000);

    // Set up periodic clicking
    const intervalTimer = setInterval(performAutoClick, 15000 + Math.random() * 10000); // 15-25 seconds

    return () => {
      clearTimeout(initTimer);
      clearInterval(intervalTimer);
    };
  }, [pageType]);

  return null;
};

export default AutoClickAd;