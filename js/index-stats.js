(function() {
            class VisitorStats {
              constructor() {
                this.initStats();
                this.updateStats();
                this.startTimer();
              }

              initStats() {
                const stats = JSON.parse(localStorage.getItem('visitorStats')) || {
                  totalVisitors: 0,
                  currentVisitors: 0,
                  todayVisitors: 0,
                  pageLoads: 0,
                  lastVisit: new Date().toLocaleString('hr-HR'),
                  sessionStartTime: Date.now(),
                  mostViewedPage: window.location.pathname,
                  browserType: this.detectBrowser(),
                  deviceType: this.detectDevice(),
                  timezone: this.getTimezone()
                };

                stats.totalVisitors++;
                stats.pageLoads++;
                stats.lastVisit = new Date().toLocaleString('hr-HR');

                const today = new Date().toDateString();
                const lastDay = localStorage.getItem('lastVisitDay') || '';
                
                if (today === lastDay) {
                  stats.todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;
                  stats.todayVisitors++;
                } else {
                  stats.todayVisitors = 1;
                  localStorage.setItem('lastVisitDay', today);
                }

                localStorage.setItem('visitorStats', JSON.stringify(stats));
                localStorage.setItem('todayVisitors', stats.todayVisitors);
                localStorage.setItem('sessionStartTime', stats.sessionStartTime);

                const currentOnline = Math.floor(Math.random() * 15) + 1;
                localStorage.setItem('currentVisitors', currentOnline);

                return stats;
              }

              detectBrowser() {
                const userAgent = navigator.userAgent;
                if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
                if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
                if (userAgent.indexOf('Safari') > -1) return 'Safari';
                if (userAgent.indexOf('Edge') > -1) return 'Edge';
                return 'Nepoznat';
              }

              detectDevice() {
                const userAgent = navigator.userAgent;
                if (/mobile/i.test(userAgent)) return '📱 Mobitel';
                if (/tablet/i.test(userAgent)) return '📱 Tablet';
                return '💻 Desktop';
              }

              getTimezone() {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (timezone.includes('Europe/Zagreb')) return '🇭🇷 Hrvatska (UTC+1)';
                return timezone;
              }

              updateStats() {
                const stats = JSON.parse(localStorage.getItem('visitorStats'));
                const currentOnline = parseInt(localStorage.getItem('currentVisitors')) || 0;
                const todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;

                document.getElementById('total-visitors').textContent = 
                  stats.totalVisitors.toLocaleString('hr-HR');
                document.getElementById('current-visitors').textContent = 
                  currentOnline.toLocaleString('hr-HR');
                document.getElementById('today-visitors').textContent = 
                  todayVisitors.toLocaleString('hr-HR');
                document.getElementById('page-loads').textContent = 
                  stats.pageLoads.toLocaleString('hr-HR');
                document.getElementById('timezone').textContent = stats.timezone;
                document.getElementById('device-type').textContent = stats.deviceType;
                document.getElementById('browser-type').textContent = stats.browserType;
                document.getElementById('last-visit').textContent = stats.lastVisit;
                document.getElementById('most-viewed').textContent = stats.mostViewedPage;
              }

              startTimer() {
                setInterval(() => {
                  const sessionStart = parseInt(localStorage.getItem('sessionStartTime'));
                  const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
                  
                  const minutes = Math.floor(elapsed / 60);
                  const seconds = elapsed % 60;
                  
                  document.getElementById('visit-time').textContent = 
                    `${minutes}m ${seconds}s`;

                  if (Math.random() > 0.95) {
                    const current = Math.floor(Math.random() * 20) + 1;
                    localStorage.setItem('currentVisitors', current);
                    this.updateStats();
                  }
                }, 1000);
              }
            }

            function bootStats() {
              if (!document.getElementById('total-visitors')) {
                // markup nije još na stranici — pokušaj kasnije
                return setTimeout(bootStats, 100);
              }
              try { new VisitorStats(); } catch (e) { console.error('[stats] init', e); }
              try { initStatsWidget(); } catch (e) { console.error('[stats] widget', e); }
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', bootStats);
            } else {
              bootStats();
            }

            function initStatsWidget() {
              const toggle = document.querySelector('.stats-toggle');
              const panel = document.querySelector('.stats-panel');
              const closeBtn = document.querySelector('.stats-close');
              if (!toggle || !panel) return;

              toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
              });

              closeBtn && closeBtn.addEventListener('click', function() {
                panel.style.display = 'none';
              });

              document.addEventListener('click', function(event) {
                if (!event.target.closest('.stats-widget')) {
                  panel.style.display = 'none';
                }
              });
            }
          })();
