// 背景切り替え処理を関数化（初期表示とページ遷移の両方で使うため）
function updatePageBackground(path) {
  // ページ遷移時に入れ子構造になり、複数のcontainerが存在する可能性があるため、すべて取得して適用する
  const containers = document.querySelectorAll(".container");
  if (containers.length === 0) return;

  containers.forEach(container => {
    // /lab/配下のすべてのページ
    if (path.includes('/lab/')) {
      document.body.classList.add('lab-page');
      // lab.htmlのみlab-containerクラスを追加
      if (path.includes('lab.html')) {
        container.classList.add('lab-container');
      } else {
        container.classList.remove('lab-container');
      }
      // 背景を明示的に設定
      container.style.backgroundImage = "url(/assets/img/aidol/node/nodeback01.PNG)";
      container.style.backgroundSize = "contain";
      container.style.backgroundRepeat = "no-repeat";
      container.style.backgroundPosition = "top center";
      container.style.backgroundColor = "#000";
      // ダークモードを適用
      applyDarkModeStyles();
    }
    // デフォルト（index.htmlなど）
    else {
      document.body.classList.remove('lab-page');
      container.classList.remove('lab-container');
      container.style.backgroundImage = "url(/assets/img/top.jpg)";
      container.style.backgroundSize = "contain";
      container.style.backgroundRepeat = "no-repeat";
      container.style.backgroundPosition = "top center";
      container.style.backgroundColor = "#000";
      resetContentStyle();
    }
  });
}

// ダークモードスタイルを一括適用する関数
function applyDarkModeStyles() {
  // 1. コンテンツエリア（白い箱）
  const mainContents = document.querySelectorAll('.tab-content-itemwiki, .tab-content-itemwiki2, .contentwikitop');
  mainContents.forEach(mainContent => {
    mainContent.style.setProperty('background', 'rgba(0, 0, 0, 0.6)', 'important'); // 少し濃くして可読性UP
    mainContent.style.setProperty('backdrop-filter', 'none', 'important');
    mainContent.style.setProperty('color', '#f5f5f7', 'important');
    mainContent.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
    mainContent.style.setProperty('text-shadow', '0 1px 4px rgba(0, 0, 0, 0.8)', 'important');
  });

  // タイトルバー (.black) は白のままにするため処理を削除

  // ★追加: 注意事項ボックス（wiki-update-box）を完全透明に調整
  const updateBoxes = document.querySelectorAll('.wiki-update-box');
  updateBoxes.forEach(box => {
    // 背景をほぼ透明(0.05)にする
    box.style.setProperty('background', 'rgba(255, 255, 255, 0.05)', 'important');
    // すりガラス効果を削除（一番透明に）
    box.style.setProperty('backdrop-filter', 'none', 'important');
    box.style.setProperty('-webkit-backdrop-filter', 'none', 'important'); 
    
    // 文字色は白で、背景がなくても読めるように影を少し強める
    box.style.setProperty('color', '#fff', 'important'); 
    box.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important'); // 枠線は薄く残す
    box.style.setProperty('border-radius', '12px', 'important');
    box.style.setProperty('text-shadow', '0 1px 3px rgba(0, 0, 0, 0.9)', 'important'); // 影を強めに
    box.style.setProperty('box-shadow', 'none', 'important'); // ボックスの影も消して透明感を出す
    
    // 左側の青い線を消す
    box.style.setProperty('border-left', 'none', 'important');
    // パディング調整
    box.style.setProperty('padding', '16px 20px', 'important');
  });

  // 3. インフォボックス
  const infoboxes = document.querySelectorAll('.wiki-infobox');
  infoboxes.forEach(infobox => {
    infobox.style.setProperty('background', 'rgba(0, 0, 0, 0.6)', 'important');
    infobox.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
    infobox.style.setProperty('color', '#f5f5f7', 'important');
    infobox.style.setProperty('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.8)', 'important');
    
    // インフォボックス内のテーブル背景色を透明に
    const tables = infobox.querySelectorAll('table');
    tables.forEach(table => {
        table.style.setProperty('background-color', 'transparent', 'important');
    });

    // 行（tr）の背景色も透明にして縞模様を消す
    const rows = infobox.querySelectorAll('tr');
    rows.forEach(row => {
        row.style.setProperty('background-color', 'transparent', 'important');
    });

    const headers = infobox.querySelectorAll('h2');
    headers.forEach(h2 => {
        h2.style.setProperty('border-bottom-color', 'rgba(255, 255, 255, 0.3)', 'important');
    });
    
    const cells = infobox.querySelectorAll('th, td');
    cells.forEach(cell => {
        cell.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
        cell.style.setProperty('color', '#f5f5f7', 'important');
        
        if (cell.tagName === 'TH') {
            cell.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
        } else {
            cell.style.setProperty('background-color', 'transparent', 'important');
        }
    });

    const images = infobox.querySelectorAll('img');
    images.forEach(img => {
        img.style.setProperty('border-color', 'rgba(255, 255, 255, 0.2)', 'important');
        img.style.setProperty('background-color', 'transparent', 'important');
    });

    const sliderBtns = infobox.querySelectorAll('.slider-btn');
    sliderBtns.forEach(btn => {
        btn.style.setProperty('background', 'rgba(60, 60, 60, 0.8)', 'important');
        btn.style.setProperty('border-color', 'rgba(255, 255, 255, 0.3)', 'important');
        btn.style.setProperty('color', '#fff', 'important');
    });
  });

  // 4. メニューエリア (.wiki-menu)
  const menus = document.querySelectorAll('.wiki-menu');
  menus.forEach(menu => {
    menu.style.setProperty('background', 'rgba(0, 0, 0, 0.6)', 'important'); // 背景色を追加
    menu.style.setProperty('color', '#f5f5f7', 'important');
    menu.style.setProperty('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.8)', 'important');
    menu.style.setProperty('border-right', '1px solid rgba(255, 255, 255, 0.1)', 'important'); // 境界線も調整
    menu.style.setProperty('border-radius', '4px', 'important');
    menu.style.setProperty('padding', '10px', 'important'); // パディング調整
  });

  // 5. リンク色を調整
  const links = document.querySelectorAll('.wiki-article a');
  links.forEach(link => {
    link.style.setProperty('color', '#5AC8FA', 'important');
    link.style.setProperty('text-shadow', 'none', 'important');
  });
}

// スタイルをリセットするヘルパー関数
function resetContentStyle() {
  const mainContents = document.querySelectorAll('.tab-content-itemwiki, .tab-content-itemwiki2, .contentwikitop');
  mainContents.forEach(mainContent => {
    mainContent.style.background = "";
    mainContent.style.backdropFilter = "";
    mainContent.style.color = "";
    mainContent.style.borderColor = "";
    mainContent.style.textShadow = "";
  });

  // 注意事項ボックスのリセット
  const updateBoxes = document.querySelectorAll('.wiki-update-box');
  updateBoxes.forEach(box => {
    box.style.background = "";
    box.style.backdropFilter = "";
    box.style.webkitBackdropFilter = "";
    box.style.color = "";
    box.style.border = "";
    box.style.borderRadius = "";
    box.style.textShadow = "";
    box.style.boxShadow = "";
    box.style.borderLeft = "";
    box.style.padding = "";
  });

  const links = document.querySelectorAll('.wiki-article a');
  links.forEach(link => {
    link.style.color = "";
    link.style.textShadow = "";
  });

  const infoboxes = document.querySelectorAll('.wiki-infobox');
  infoboxes.forEach(infobox => {
    infobox.style.background = "";
    infobox.style.borderColor = "";
    infobox.style.color = "";
    infobox.style.textShadow = "";
    
    // テーブル背景のリセット
    const tables = infobox.querySelectorAll('table');
    tables.forEach(table => {
        table.style.backgroundColor = "";
    });

    // 行背景のリセット
    const rows = infobox.querySelectorAll('tr');
    rows.forEach(row => {
        row.style.backgroundColor = "";
    });

    const headers = infobox.querySelectorAll('h2');
    headers.forEach(h2 => h2.style.borderBottomColor = "");
    
    const cells = infobox.querySelectorAll('th, td');
    cells.forEach(cell => {
        cell.style.borderColor = "";
        cell.style.color = "";
        cell.style.backgroundColor = "";
    });
    
    const images = infobox.querySelectorAll('img');
    images.forEach(img => {
        img.style.borderColor = "";
        img.style.backgroundColor = "";
    });
    const sliderBtns = infobox.querySelectorAll('.slider-btn');
    sliderBtns.forEach(btn => {
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
    });
  });

  const menus = document.querySelectorAll('.wiki-menu');
  menus.forEach(menu => {
    menu.style.background = "";
    menu.style.color = "";
    menu.style.textShadow = "";
    menu.style.borderRight = "";
    menu.style.borderRadius = "";
    menu.style.padding = "";
  });
}

// MutationObserverを使って動的に追加された要素にもスタイルを適用
const styleObserver = new MutationObserver((mutations) => {
  // DOM内に .wiki-article が存在する場合のみ適用（誤爆防止）
  if (document.querySelector('.wiki-article')) {
    // /lab/配下のすべてのページ
    if (window.location.pathname.includes('/lab/')) {
        applyDarkModeStyles();
    }
  }
});

// グローバル変数: 現在表示中のページURL（リサイズ時の判定用）
let currentLoadedUrl = '';

// 美術館風ギャラリーのスタイルを適用する関数
function applyGalleryStyle(gallery) {
    // ギャラリー本体
    gallery.style.setProperty('display', 'flex', 'important');
    gallery.style.setProperty('flex-direction', 'row', 'important');
    gallery.style.setProperty('flex-wrap', 'wrap', 'important');
    gallery.style.setProperty('gap', '40px', 'important');
    gallery.style.setProperty('list-style', 'none', 'important');
    gallery.style.setProperty('padding', '40px 20px', 'important');
    gallery.style.setProperty('margin', '20px 0', 'important');
    gallery.style.setProperty('background', 'linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 100%)', 'important');
    gallery.style.setProperty('border-radius', '8px', 'important');
    
    // li要素
    const items = gallery.querySelectorAll('li');
    items.forEach(item => {
        item.style.setProperty('flex', '0 0 auto', 'important');
        item.style.setProperty('display', 'inline-block', 'important');
        item.style.setProperty('position', 'relative', 'important');
        item.style.setProperty('transition', 'transform 0.3s ease', 'important');
    });
    
    // img要素 - 額縁効果
    const images = gallery.querySelectorAll('img');
    images.forEach(img => {
        img.style.setProperty('display', 'block', 'important');
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('height', 'auto', 'important');
        img.style.setProperty('border', '15px solid #ffffff', 'important');
        img.style.setProperty('box-shadow', '0 0 0 1px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.15)', 'important');
        img.style.setProperty('transition', 'all 0.3s ease', 'important');
        img.style.setProperty('border-radius', '2px', 'important');
    });
    
    // ホバー効果
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            const img = this.querySelector('img');
            if (img) {
                img.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.25)';
                img.style.filter = 'brightness(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const img = this.querySelector('img');
            if (img) {
                img.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.15)';
                img.style.filter = '';
            }
        });
    });
}


// 共通パーツ読み込み
async function loadPart(id, file) {
  console.log('🚀 loadPart呼び出し:', { id, file });
  
  // URLとハッシュを分離
  let url = file;
  let hash = '';
  if (file.includes('#')) {
    [url, hash] = file.split('#');
    console.log('🔗 ハッシュ検出:', { url, hash });
  }
  
  // ★現在のURLを保存（リサイズ時の判定用）
  if (id === 'content') {
    currentLoadedUrl = url;
    console.log('📌 現在のURL保存:', currentLoadedUrl);
  }

  const res = await fetch(url);
  const html = await res.text();
  const target = document.getElementById(id);
  if (!target) {
    console.log('❌ ターゲット要素が見つかりません:', id);
    return;
  }

  // コンテンツ更新前に監視を停止（他ページへの誤適用防止）
  if (id === "content") {
    styleObserver.disconnect();
  }

  // id="content"への読み込みの場合、HTMLからコンテンツ部分のみを抽出
  if (id === "content") {
    console.log('📄 コンテンツ読み込み開始:', url);
    console.log('📄 元のHTML長:', html.length);
    
    // 一時的なdiv要素を作成してHTMLをパース
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    console.log('📄 tempDiv作成完了');
    
    // id="content"の中身を取得
    const contentDiv = tempDiv.querySelector('#content');
    console.log('📄 contentDiv:', contentDiv ? 'found' : 'not found');
    
    if (contentDiv) {
      // contentの中身だけを取得
      console.log('📄 contentDiv.innerHTML長:', contentDiv.innerHTML.length);
      
      // ★HTML文字列を操作して正しいタブにcheckedを付ける（ちらつき防止）
      let finalHTML = contentDiv.innerHTML;
      
      // ハッシュがある場合のみ、すべてのchecked属性を削除
      if (hash && hash.startsWith('tabContent')) {
        finalHTML = finalHTML.replace(/\s+checked(?:\s*=\s*["']?checked["']?)?/gi, '');
        console.log('🔧 ハッシュあり: checked属性を削除');
      }
      
      // タブシステムがある場合
      if (finalHTML.includes('name="tab-radio"')) {
        if (hash && hash.startsWith('tabContent')) {
          // ハッシュ指定あり → 該当タブにcheckedを付ける
          const radioId = hash.replace('tabContent', 'tab');
          console.log('⚡ HTML文字列にcheckedを追加:', radioId);
          
          // id="tab01" を id="tab01" checked に置換
          const regex = new RegExp(`(id="${radioId}"[^>]*)`, 'i');
          finalHTML = finalHTML.replace(regex, '$1 checked');
        }
        // ハッシュなしの場合はHTMLのchecked属性をそのまま使用（何もしない）
        // ※元のHTMLにchecked属性があればそれが使われる
        console.log('⚡ ハッシュなし: HTMLのchecked属性を維持');
      }
      
      // 元のtargetのクラスを保存
      const originalClasses = target.className;
      console.log('📄 元のクラス:', originalClasses);
      
      // ★checked済みのHTMLを挿入（ちらつきなし！）
      target.innerHTML = finalHTML;
      
      // クラスを復元（上書きされていた場合に備えて）
      if (originalClasses && !target.className) {
        target.className = originalClasses;
        console.log('📄 クラスを復元:', originalClasses);
      }
      
      console.log('📄 target.innerHTML更新完了');
    } else {
      // id="content"が見つからない場合はそのまま挿入
      console.log('📄 contentDiv未検出、html全体を挿入');
      target.innerHTML = html;
    }
    
    // ヘッダーの存在確認
    setTimeout(() => {
      const header = document.getElementById('header');
      console.log('📄 ヘッダー確認:', header ? 'exists' : 'missing');
      if (header) {
        console.log('📄 ヘッダー内容長:', header.innerHTML.length);
      }
    }, 100);
  } else {
    // header, footerなどはそのまま挿入
    target.innerHTML = html;
  }

  // ページ遷移後にアコーディオンを即座に開く（DOMが更新された直後）
  if (id === "content" && typeof openAutoExpandAccordions === 'function') {
    openAutoExpandAccordions();
  }

  // ページごとの背景を設定（ページ遷移時）
  if (id === "content") {
    // ★ページ遷移時にハンバーガーメニューの状態をリセット
    const hamburger = document.getElementById('hamburger_menu');
    const nav = document.querySelector('nav');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    if (nav) {
      nav.classList.remove('active');
    }
    
    // ★ページ遷移時に全てのwiki-menuハンバーガーボタンを即座に削除
    console.log('🧹 ページ遷移: wiki-menuハンバーガーボタンを全削除');
    const allWikiMenuBtns = document.querySelectorAll('.wiki-menu-toggle, .wiki-menu1-toggle, .wiki-menu2-toggle');
    const bodyMenus = document.querySelectorAll('body > .wiki-menu, body > .wiki-menu1, body > .wiki-menu2');
    
    console.log('🧹 削除対象 - ボタン:', allWikiMenuBtns.length, 'body直下メニュー:', bodyMenus.length);
    
    // ★チラつき防止：削除前に即座に非表示にする
    allWikiMenuBtns.forEach(btn => {
      btn.classList.remove('active'); // activeクラスを削除
      btn.style.display = 'none';
      btn.style.visibility = 'hidden';
      btn.style.opacity = '0';
    });
    bodyMenus.forEach(menu => {
      menu.classList.remove('active'); // activeクラスを削除
      menu.style.display = 'none';
      menu.style.visibility = 'hidden';
      menu.style.opacity = '0';
      menu.style.left = '-100%';
    });
    
    // 非表示にした後に削除
    allWikiMenuBtns.forEach(btn => btn.remove());
    bodyMenus.forEach(menu => menu.remove());
    
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    
    // /lab/配下のすべてのページの場合のみ監視を再開
    if (url.includes('/lab/')) {
        styleObserver.observe(target, { childList: true, subtree: true });
    }
    
    // DOM変更直後に順序を適用（MutationObserverではなく直接実行）
    updatePageBackground(url);
    
    // /lab/配下なら再度スタイル適用念押し
    if (url.includes('/lab/')) {
      applyDarkModeStyles();
      
      // ★画像ギャラリーのスタイルを強制適用（SPA遷移時）
      document.querySelectorAll('ul.image-gallery').forEach(gallery => {
          applyGalleryStyle(gallery);
      });
    }
    
    // ★重要: DOM挿入完了後に順序を適用（複数タイミングで確実に）
    const applyOrderForUrl = (url) => {
      console.log('🔄 順序適用チェック, url:', url);
      
      // blackpink.html、twice.html、/lab/aidol/配下の表示順序を適用
      if (url.includes('blackpink.html') || url.includes('twice.html') || url.includes('/lab/aidol/')) {
        console.log('✅ 特別ページ検出 - applySpecialPageMenuOrder実行');
        applySpecialPageMenuOrder();
      } else {
        console.log('📋 通常ページ - removeSpecialPageMenuOrder実行');
        removeSpecialPageMenuOrder();
      }
    };
    
    // 複数のタイミングで実行（確実にするため）
    setTimeout(() => applyOrderForUrl(url), 50);   // 1回目
    setTimeout(() => applyOrderForUrl(url), 150);  // 2回目
    setTimeout(() => applyOrderForUrl(url), 300);  // 3回目（念押し）
    
    // アコーディオンも複数回開く
    setTimeout(() => {
      if (typeof openAutoExpandAccordions === 'function') {
        openAutoExpandAccordions();
      }
    }, 200);
    
    // ★wiki-menuハンバーガーメニューを再初期化（必要に応じて新規作成）
    if (typeof initWikiMenuHamburger === 'function') {
      // DOM更新後に複数回実行して確実に
      setTimeout(() => initWikiMenuHamburger(), 100);
      setTimeout(() => initWikiMenuHamburger(), 300);
    }
  }

  // タブシステムの初期化（バックアップ - DOM挿入直後で既に実行済み）
  if (id === "content") {
    const initTabSystem = () => {
      const allRadios = document.querySelectorAll('input[type="radio"][name="tab-radio"]');
      
      if (allRadios.length === 0) return; // タブシステムが無いページ
      
      // すでにチェックされているタブがあればスキップ
      const hasChecked = Array.from(allRadios).some(radio => radio.checked);
      if (hasChecked) {
        console.log('⏭️ 既にタブが選択されているためスキップ');
        return;
      }
      
      console.log('🔄 バックアップ: タブシステム再初期化');
      
      // すべてのchecked属性を削除
      allRadios.forEach(radio => {
        radio.removeAttribute('checked');
        radio.checked = false;
      });
      
      if (hash && hash.startsWith('tabContent')) {
        const radioId = hash.replace('tabContent', 'tab');
        const radioButton = document.getElementById(radioId);
        if (radioButton) radioButton.checked = true;
      } else {
        const firstTab = document.getElementById('tab01');
        if (firstTab) firstTab.checked = true;
      }
    };
    
    // バックアップとして1回だけ実行
    setTimeout(initTabSystem, 100);
  }

  // ハッシュが指定されている場合の処理（スクロール用）
  if (hash && id === "content" && !hash.startsWith('tabContent')) {
    
    // スクロール実行関数
    const executeScroll = (targetElement) => {
      console.log('🚀 スクロール実行開始');
      console.log('🎯 ターゲット要素:', {
        tagName: targetElement.tagName,
        id: targetElement.id,
        textContent: targetElement.textContent.substring(0, 50)
      });
      
      // ターゲット要素が含まれるタブを見つけて切り替え
      let tabContent = targetElement.closest('[id^="tabContent"]');
      console.log('📦 親tabContent:', tabContent ? tabContent.id : 'not found');
      
      if (tabContent) {
        const tabId = tabContent.id.replace('tabContent', 'tab');
        
        // 2つ目のtab-area内のラジオボタンを取得
        const tabAreas = document.querySelectorAll('.tab-area');
        const targetTabArea = tabAreas.length >= 2 ? tabAreas[1] : tabAreas[0];
        const tabRadio = targetTabArea ? targetTabArea.querySelector(`#${tabId}`) : null;
        
        console.log('📑 切り替え対象タブ:', tabId, tabRadio ? 'found' : 'not found');
        console.log('📑 使用tab-area:', tabAreas.length >= 2 ? '2つ目' : '1つ目');
        
        if (tabRadio) {
          // 全ラジオボタンの状態を確認（対象tab-areaのみ）
          const allRadios = targetTabArea.querySelectorAll('input[type="radio"][name="tab-radio"]');
          console.log('🔍 全ラジオボタンの状態（切り替え前）:');
          allRadios.forEach(radio => {
            console.log(`  - ${radio.id}: checked=${radio.checked}`);
          });
          
          console.log('📑 タブラジオ checked前:', tabRadio.checked);
          tabRadio.checked = true;
          console.log('📑 タブラジオ checked後:', tabRadio.checked);
          
          // 切り替え後の状態を確認
          console.log('🔍 全ラジオボタンの状態（切り替え後）:');
          allRadios.forEach(radio => {
            console.log(`  - ${radio.id}: checked=${radio.checked}`);
          });
        }
      }
      
      // 要素の親アコーディオンを開く
      let parent = targetElement.parentElement;
      let accordionCount = 0;
      while (parent && parent !== target) {
        if (parent.classList.contains('accordion-content')) {
          parent.classList.add('open');
          accordionCount++;
          const toggle = parent.previousElementSibling;
          if (toggle && toggle.classList.contains('accordion-toggle')) {
            toggle.setAttribute('aria-expanded', 'true');
            const arrow = toggle.querySelector('.arrow');
            if (arrow) arrow.textContent = '▼';
          }
        }
        parent = parent.parentElement;
      }
      console.log('🗂️ 開いたアコーディオン数:', accordionCount);
      
      // wiki-main要素を探す
      const wikiMain = targetElement.closest('.wiki-main');
      console.log('📜 wiki-main:', wikiMain ? 'found' : 'not found');
      
      if (wikiMain) {
        const wikiMainStyle = window.getComputedStyle(wikiMain);
        const isScrollable = wikiMainStyle.overflowY === 'auto' || wikiMainStyle.overflowY === 'scroll';
        
        console.log('📜 wiki-mainスクロール可能:', isScrollable);
        
        if (isScrollable) {
          // PC: wiki-main内でスクロール
          const targetOffset = targetElement.offsetTop;
          console.log('📍 PC - ターゲットoffsetTop:', targetOffset);
          console.log('📍 PC - wiki-main現在のscrollTop:', wikiMain.scrollTop);
          
          wikiMain.scrollTop = targetOffset - 20;
          
          console.log('📍 PC - wiki-main設定後のscrollTop:', wikiMain.scrollTop);
          console.log('✅ wiki-main内スクロール完了');
        } else {
          // スマホ: tab-content-itemwiki内でスクロール
          console.log('📱 スマホモード: tab-content-itemwiki内でスクロール');
          
          const tabContentItem = targetElement.closest('.tab-content-itemwiki, .tab-content-itemwiki2, .contentwikitop');
          console.log('📦 tab-content-itemwiki:', tabContentItem ? 'found' : 'not found');
          
          if (tabContentItem) {
            const targetOffset = targetElement.offsetTop;
            
            console.log('📍 スマホ - ターゲットoffsetTop:', targetOffset);
            console.log('📍 スマホ - tab-content-itemwiki現在のscrollTop:', tabContentItem.scrollTop);
            
            // スクロール位置を調整（余白を最小限に）
            tabContentItem.scrollTop = targetOffset - 20;
            
            console.log('📍 スマホ - tab-content-itemwiki設定後のscrollTop:', tabContentItem.scrollTop);
            console.log('✅ tab-content-itemwiki内スクロール完了');
          } else {
            console.log('⚠️ tab-content-itemwikiが見つからない、ページ全体でスクロール');
            
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop;
            
            window.scrollTo({
              top: targetPosition - 80,
              behavior: 'auto'
            });
            
            console.log('✅ ページ全体スクロール完了');
          }
        }
      } else {
        console.log('⚠️ wiki-mainが見つからない、scrollIntoViewを使用');
        targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        console.log('✅ 通常スクロール完了');
      }
    };
    
    // ハッシュジャンプを実行する関数
    const scrollToHash = () => {
      console.log('📱 画面幅:', window.innerWidth);
      console.log('📱 デバイス判定:', window.innerWidth <= 899 ? 'スマホ' : 'PC');
      
      // HTML全体から要素を探す（display:noneでも見つかる）
      const targetElement = document.getElementById(hash);
      console.log('🔍 HTML全体からターゲット要素検索:', hash, targetElement ? 'found' : 'not found');
      
      if (!targetElement) {
        console.log('❌ ターゲット要素が見つかりません:', hash);
        console.log('🔍 全てのID要素:', Array.from(document.querySelectorAll('[id]')).map(el => el.id).slice(0, 50));
        return false;
      }
      
      // タブ切り替えとスクロールを即座に実行（待機なし）
      console.log('⚡ タブ切り替えとスクロールを即座に実行');
      executeScroll(targetElement);
      
      return true;
    };
    
    // 即座に実行を試みる
    let success = scrollToHash();
    
    // 失敗した場合はリトライ（短い間隔で）
    if (!success) {
      console.log('🔄 リトライ1回目 (50ms後)');
      setTimeout(() => {
        success = scrollToHash();
        if (!success) {
          console.log('🔄 リトライ2回目 (150ms後)');
          setTimeout(() => {
            scrollToHash();
          }, 150);
        }
      }, 50);
    }
  }

  // ヘッダーが読み込まれたらイベント登録
  if (id === "header") {
    const hamburger_menu = document.querySelector("#hamburger_menu");
    const gnav = document.querySelector("nav");

    if (hamburger_menu && gnav) {
      const closeMenu = () => {
        hamburger_menu.classList.remove("active");
        gnav.classList.remove("active");
        const wikiMenuToggles = document.querySelectorAll(".wiki-menu-toggle, .wiki-menu2-toggle");
        wikiMenuToggles.forEach(btn => btn.style.display = "flex");
      };

      hamburger_menu.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const willBeActive = !hamburger_menu.classList.contains("active");
        
        if (willBeActive) {
          hamburger_menu.classList.add("active");
          gnav.classList.add("active");
          
          // navメニューを一時的にbody直下に移動（z-indexを確実に機能させるため）
          if (!gnav.hasAttribute('data-moved-to-body')) {
            gnav.setAttribute('data-moved-to-body', 'true');
            if (gnav.parentElement !== document.body) {
              document.body.appendChild(gnav);
            }
          }
          
          const wikiMenuToggles = document.querySelectorAll(".wiki-menu-toggle, .wiki-menu2-toggle");
          wikiMenuToggles.forEach(btn => btn.style.display = "none");
        } else {
          closeMenu();
        }
      });

      gnav.addEventListener("click", () => {
        closeMenu();
      });

      document.addEventListener("click", (e) => {
        if (gnav.classList.contains("active")) {
          if (!hamburger_menu.contains(e.target) && !gnav.contains(e.target)) {
            // ★メニュー外のクリックを検出
            console.log('🟡 navメニュー外クリック検出');
            
            // ★リンクをクリックした場合は、ページ遷移を防いでメニューを閉じる
            const clickedLink = e.target.closest('a');
            if (clickedLink) {
              console.log('🔗 navメニュー外リンククリック検出 - ページ遷移を防止:', clickedLink.textContent);
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
            
            closeMenu();
          }
        }
      }, true); // ★captureフェーズで登録（リンクのクリックイベントより先に実行される）
    }
  }

  // スライダーの初期化（常に実行）
  if (typeof initBlackpinkSlider === 'function') {
    setTimeout(() => initBlackpinkSlider(), 50);
    setTimeout(() => initBlackpinkSlider(), 200);
  }

  // Wikiメニューのハンバーガーボタン再初期化
  // ★ページ遷移時は必ず古いボタンを削除してから初期化
  if (typeof initWikiMenuHamburger === 'function') {
    console.log('🔄 ページ遷移: wiki-menuハンバーガー初期化開始');
    // まず古いボタンとオーバーレイを完全に削除
    const oldBtns = document.querySelectorAll('.wiki-menu-toggle, .wiki-menu1-toggle, .wiki-menu2-toggle');
    console.log('🔄 ページ遷移: 削除するボタン数 =', oldBtns.length);
    oldBtns.forEach(btn => {
      console.log('🔄 削除:', btn.className);
      btn.remove();
    });
    const oldOverlays = document.querySelectorAll('.wiki-menu-overlay');
    console.log('🔄 ページ遷移: 削除するオーバーレイ数 =', oldOverlays.length);
    oldOverlays.forEach(overlay => overlay.remove());
    
    // 新しいページのwiki-menu要素をチェック
    const wikiMenus = document.querySelectorAll('.wiki-menu, .wiki-menu1, .wiki-menu2');
    console.log('🔄 ページ遷移: 新しいページのwiki-menu要素数 =', wikiMenus.length);
    
    // 新しいページのwiki-menu要素に基づいて初期化
    initWikiMenuHamburger();
    setTimeout(() => initWikiMenuHamburger(), 100);
  }
  
  // ページ遷移後にアコーディオンを開く
  if (typeof openAutoExpandAccordions === 'function') {
    openAutoExpandAccordions();
  }
}

// スライダー初期化関数
function initBlackpinkSlider() {
  const sliders = document.querySelectorAll(".slider-box");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const prev = slider.querySelector(".prev-btn");
    const next = slider.querySelector(".next-btn");
    const dotsContainer = slider.querySelector(".slider-dots");
    const sliderInner = slider.querySelector(".slider-inner");

    if (!slides.length || !prev || !next || !dotsContainer || !sliderInner) return;

    // 既存のイベントリスナーをクリアするため、ボタンをクローンして置き換え
    const newPrev = prev.cloneNode(true);
    const newNext = next.cloneNode(true);
    prev.replaceWith(newPrev);
    next.replaceWith(newNext);

    let index = 0;
    let autoSlideInterval = null;

    // 自動スライドが有効かどうかを判定
    // data-auto-slide属性があるか、tab-content-itemtop内にあればtrue
    const isAutoSlideEnabled = slider.hasAttribute('data-auto-slide') || 
                                slider.closest('.tab-content-itemtop') !== null;

    // 自動スライド機能の関数定義
    const startAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      autoSlideInterval = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
      }, 4000); // 4秒ごとに自動スライド
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
        
        if (isAutoSlideEnabled) {
          resetAutoSlide();
        }
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    const showSlide = (i) => {
      slides.forEach((s) => s.classList.remove("active"));
      slides[i].classList.add("active");
      dots.forEach((d) => d.classList.remove("active"));
      dots[i].classList.add("active");
    };

    newPrev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
      
      if (isAutoSlideEnabled) {
        resetAutoSlide();
      }
    });

    newNext.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
      
      if (isAutoSlideEnabled) {
        resetAutoSlide();
      }
    });

    let startX = 0;
    let endX = 0;

    sliderInner.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    sliderInner.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          index = (index + 1) % slides.length;
        } else {
          index = (index - 1 + slides.length) % slides.length;
        }
        showSlide(index);
        
        if (isAutoSlideEnabled) {
          resetAutoSlide();
        }
      }
    });

    // 自動スライド機能（条件を満たす場合のみ）
    if (isAutoSlideEnabled) {
      // 自動スライド開始
      startAutoSlide();

      // マウスホバーで一時停止
      slider.addEventListener('mouseenter', stopAutoSlide);
      slider.addEventListener('mouseleave', startAutoSlide);

      // タブが非表示になったら停止
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoSlide();
        } else if (isAutoSlideEnabled) {
          startAutoSlide();
        }
      });
    }

    showSlide(index);
  });
}

// DOM読み込み後の初期化
document.addEventListener("DOMContentLoaded", () => {
  loadPart("header", "/header.html");
  loadPart("footer", "/footer.html");

  // ★ここを追加：初期ロード時にもURLをチェックして背景を設定
  updatePageBackground(window.location.pathname);

  // 初期ロード時にも/lab/配下ならスタイル適用を即座に実行
  if (window.location.pathname.includes('/lab/')) {
    applyDarkModeStyles();
  }

  // 初期ロード時にblackpink/twice/lab/aidol配下なら表示順序を即座に適用
  if (window.location.pathname.includes('blackpink.html') || 
      window.location.pathname.includes('twice.html') ||
      window.location.pathname.includes('/lab/aidol/')) {
    applySpecialPageMenuOrder();
  }

  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.volume = 0.5;
    bgm.play().catch(() => {});
  }

  initBlackpinkSlider();
  initWikiMenuHamburger();
  
  // タブ切り替え後も再初期化
  document.body.addEventListener('change', (e) => {
    if (e.target.matches('input[name="tab-radio"]')) {
      console.log('🔄 タブ切り替え: wiki-menuハンバーガー初期化開始');
      // ★タブ切り替え時も古いボタンを削除
      const oldBtns = document.querySelectorAll('.wiki-menu-toggle, .wiki-menu1-toggle, .wiki-menu2-toggle');
      console.log('🔄 タブ切り替え: 削除するボタン数 =', oldBtns.length);
      oldBtns.forEach(btn => {
        console.log('🔄 削除:', btn.className);
        btn.remove();
      });
      const oldOverlays = document.querySelectorAll('.wiki-menu-overlay');
      console.log('🔄 タブ切り替え: 削除するオーバーレイ数 =', oldOverlays.length);
      oldOverlays.forEach(overlay => overlay.remove());
      
      // ★body直下に移動されたwiki-menu要素も削除
      const bodyWikiMenus = document.querySelectorAll('body > .wiki-menu, body > .wiki-menu1, body > .wiki-menu2');
      console.log('🔄 タブ切り替え: 削除するbody直下のwiki-menu数 =', bodyWikiMenus.length);
      bodyWikiMenus.forEach(menu => {
        console.log('🔄 削除: body直下のwiki-menu', menu.className);
        menu.remove();
      });
      
      // body.menu-openクラスとoverflow設定をリセット
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      
      // 新しいタブのwiki-menu要素をチェック
      const wikiMenus = document.querySelectorAll('.wiki-menu, .wiki-menu1, .wiki-menu2');
      console.log('🔄 タブ切り替え: wiki-menu要素数 =', wikiMenus.length);
      
      initWikiMenuHamburger();
      setTimeout(() => initWikiMenuHamburger(), 100);
      // スライダーも再初期化
      setTimeout(() => initBlackpinkSlider(), 50);
      setTimeout(() => initBlackpinkSlider(), 200);
    }
  });
});

// BGMトグル
function toggleBGM() {
  const bgm = document.getElementById("bgm");
  const btn = document.getElementById("bgm-toggle");
  if (!bgm || !btn) return;

  if (bgm.paused) {
    bgm.play().then(() => {
      btn.textContent = "[BGM停止]";
      btn.classList.add("playing");
    }).catch(() => {});
  } else {
    bgm.pause();
    btn.textContent = "[BGM]";
    btn.classList.remove("playing");
  }
}

// アコーディオン処理
document.body.addEventListener("click", function (event) {
  const toggle = event.target.closest(".accordion-toggle");
  if (!toggle) return;

  let content = toggle.nextElementSibling;
  
  if (!content || !content.classList.contains("accordion-content")) {
    const parent = toggle.parentElement;
    content = parent ? parent.nextElementSibling : null;
  }
  
  if (!content || !content.classList.contains("accordion-content")) return;

  const isExpanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  
  const arrow = toggle.querySelector(".arrow");
  if (arrow) {
    arrow.textContent = isExpanded ? "▶" : "▼";
  }
  
  // openクラスでの制御に変更
  if (isExpanded) {
    content.classList.remove("open");
  } else {
    content.classList.add("open");
  }
});

// ページ内リンク用スムーススクロール
document.addEventListener('click', function (e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const hash = anchor.getAttribute('href');
  if (hash === '#' || hash === '') return;

  const targetId = hash.substring(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // ターゲット要素がaccordion-content内にある場合、アコーディオンを開く
  let accordionContent = targetElement.closest('.accordion-content');
  if (accordionContent) {
    // アコーディオンのトグルボタンを探す
    let accordionToggle = accordionContent.previousElementSibling;
    if (accordionToggle && accordionToggle.classList.contains('accordion-toggle')) {
      // アコーディオンを開く
      accordionToggle.setAttribute("aria-expanded", "true");
      const arrow = accordionToggle.querySelector(".arrow");
      if (arrow) {
        arrow.textContent = "▼";
      }
      accordionContent.classList.add("open");
    } else {
      // トグルボタンが直前になければ、親の<p>の前を探す
      const parent = accordionContent.parentElement;
      if (parent && parent.previousElementSibling) {
        accordionToggle = parent.previousElementSibling.querySelector('.accordion-toggle');
        if (accordionToggle) {
          accordionToggle.setAttribute("aria-expanded", "true");
          const arrow = accordionToggle.querySelector(".arrow");
          if (arrow) {
            arrow.textContent = "▼";
          }
          accordionContent.classList.add("open");
        }
      }
    }
  }

  let scrollContainer = targetElement.closest('.wiki-main');
  
  if (scrollContainer) {
    const style = window.getComputedStyle(scrollContainer);
    if (style.overflowY !== 'auto' && style.overflowY !== 'scroll') {
      let parent = scrollContainer.parentElement;
      while (parent && parent !== document.body && parent !== document.documentElement) {
        const pStyle = window.getComputedStyle(parent);
        if (pStyle.overflowY === 'auto' || pStyle.overflowY === 'scroll') {
          scrollContainer = parent;
          break;
        }
        parent = parent.parentElement;
      }
    }
  }

  if (scrollContainer) {
    e.preventDefault();

    const targetRect = targetElement.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const currentScrollTop = scrollContainer.scrollTop;
    const offset = targetRect.top - containerRect.top + currentScrollTop - 20;

    scrollContainer.scrollTo({
      top: offset,
      behavior: 'auto'
    });
  }
});

// wiki-menuハンバーガーメニュー初期化
function initWikiMenuHamburger() {
  console.log('🔧 initWikiMenuHamburger 開始');
  
  // ★まず既存のボタンとイベントリスナーを削除（PC/スマホ問わず）
  const oldBtns = document.querySelectorAll('.wiki-menu-toggle, .wiki-menu1-toggle, .wiki-menu2-toggle');
  console.log('🗑️ 削除するボタン数:', oldBtns.length);
  oldBtns.forEach(btn => {
    console.log('🗑️ ボタン削除:', btn.className);
    // イベントリスナーも削除（captureフラグをtrueで削除）
    if (btn._documentClickHandler) {
      document.removeEventListener('click', btn._documentClickHandler, true);
      console.log('🗑️ documentイベントリスナー削除');
    }
    btn.remove();
  });
  
  // ★既存のwiki-menu要素に紐づいた古いイベントリスナーも削除
  const existingMenus = document.querySelectorAll('.wiki-menu, .wiki-menu1, .wiki-menu2');
  existingMenus.forEach(menu => {
    if (menu._documentClickHandler) {
      document.removeEventListener('click', menu._documentClickHandler, true);
      console.log('🗑️ menu要素のイベントリスナー削除:', menu.className);
      menu._documentClickHandler = null;
    }
    if (menu._menuClickHandler) {
      menu.removeEventListener('click', menu._menuClickHandler);
      console.log('🗑️ menu内クリックイベント削除:', menu.className);
      menu._menuClickHandler = null;
    }
  });
  
  // ★body直下に移動されたwiki-menu要素も削除
  const bodyWikiMenus = document.querySelectorAll('body > .wiki-menu, body > .wiki-menu1, body > .wiki-menu2');
  console.log('🗑️ 削除するbody直下のwiki-menu数:', bodyWikiMenus.length);
  bodyWikiMenus.forEach(menu => {
    console.log('🗑️ 削除: body直下のwiki-menu', menu.className);
    menu.remove();
  });
  bodyWikiMenus.forEach(menu => {
    console.log('🗑️ 削除: body直下のwiki-menu', menu.className);
    menu.remove();
  });
  
  document.body.style.overflow = '';
  document.body.classList.remove('menu-open');
  
  // PC表示（900px以上）の場合
  if (window.innerWidth >= 900) {
    console.log('💻 PC表示モード - ハンバーガーボタン作成スキップ');
    // wiki-menu1とwiki-menu2のインラインスタイルをクリア
    const wikiMenu1 = document.querySelector('.wiki-menu1');
    if (wikiMenu1) {
      // ステップ1: 完全に非表示
      const originalDisplay = wikiMenu1.style.display;
      wikiMenu1.style.display = 'none';
      
      // ステップ2: 次のフレームでスタイルクリア
      requestAnimationFrame(() => {
        wikiMenu1.style.cssText = '';
        // レイアウト再計算を強制
        void wikiMenu1.offsetHeight;
      });
    }
    
    const wikiMenu2 = document.querySelector('.wiki-menu2');
    if (wikiMenu2) {
      // ステップ1: 完全に非表示
      const originalDisplay = wikiMenu2.style.display;
      wikiMenu2.style.display = 'none';
      
      // ステップ2: 次のフレームでスタイルクリア
      requestAnimationFrame(() => {
        wikiMenu2.style.cssText = '';
        // レイアウト再計算を強制
        void wikiMenu2.offsetHeight;
      });
    }
    
    // PC表示ではハンバーガーメニュー生成を中止
    return;
  }
  
  // スマホ表示の処理
  const allMenus = document.querySelectorAll('.wiki-menu, .wiki-menu1, .wiki-menu2');
  console.log('📋 検出されたwiki-menu要素数:', allMenus.length);
  
  // ★wiki-menu要素が存在しない場合は処理を中止（ボタンは既に削除済み）
  if (allMenus.length === 0) {
    console.log('📋 wiki-menu要素が存在しないため、ハンバーガーボタンを作成しません');
    return;
  }
  
  console.log('📱 スマホ表示モード - ハンバーガーボタン作成開始');
  
  // ★タブシステムがある場合、アクティブなタブのwiki-menuのみを対象にする
  const checkedRadio = document.querySelector('input[type="radio"][name="tab-radio"]:checked');
  
  const wikiMenus = Array.from(allMenus).filter((menu) => {
    // wiki-menu1とwiki-menu2は常に対象
    if (menu.classList.contains('wiki-menu1') || menu.classList.contains('wiki-menu2')) {
      return true;
    }
    
    // タブシステムがある場合
    if (checkedRadio) {
      // このwiki-menuが現在アクティブなタブコンテンツ内にあるかチェック
      const tabContentId = checkedRadio.id.replace('tab', 'tabContent');
      const activeTabContent = document.getElementById(tabContentId);
      
      if (activeTabContent) {
        // このwiki-menuがアクティブなタブコンテンツ内にあるかチェック
        const isInActiveTab = activeTabContent.contains(menu);
        console.log('🔍 wiki-menu チェック:', {
          menuClass: menu.className,
          activeTab: tabContentId,
          isInActiveTab: isInActiveTab
        });
        
        if (!isInActiveTab) {
          console.log('⏭️ 非アクティブタブのwiki-menuをスキップ');
          return false;
        }
      }
    }
    
    // 表示されているかチェック
    let element = menu;
    while (element && element !== document.body) {
      const style = window.getComputedStyle(element);
      if (style.display === 'none') return false;
      element = element.parentElement;
    }
    
    const width = menu.offsetWidth;
    const height = menu.offsetHeight;
    if (width === 0 && height === 0) return false;
    
    return true;
  });
  
  if (wikiMenus.length === 0) {
    console.log('⚠️ フィルター後のwiki-menu要素が0個です');
    return;
  }
  
  console.log('✅ フィルター後のwiki-menu要素数:', wikiMenus.length);
  
  wikiMenus.forEach((menu) => {
    const toggleBtn = document.createElement('button');
    
    // wiki-menu1の場合は専用クラスを追加
    if (menu.classList.contains('wiki-menu1')) {
      toggleBtn.className = 'wiki-menu-toggle wiki-menu1-toggle';
      
      // スマホサイズ（899px以下）の場合のみインラインスタイルを適用
      if (window.innerWidth <= 899) {
        menu.style.position = 'fixed';
        menu.style.top = '45px';
        menu.style.left = '-100%';
        menu.style.width = '80%';
        menu.style.maxWidth = '300px';
        menu.style.height = 'calc(100vh - 45px)';
        menu.style.background = 'rgba(255, 255, 255, 0.98)';
        menu.style.borderRight = '1px solid #a2a9b1';
        menu.style.padding = '1rem 1rem 1rem 1rem';
        menu.style.overflowY = 'auto';
        menu.style.overflowX = 'hidden';
        menu.style.zIndex = '10300';
        menu.style.boxShadow = '2px 0 10px rgba(0, 0, 0, 0.1)';
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
      } else {
        // PC表示ではインラインスタイルをクリア
        menu.style.position = '';
        menu.style.top = '';
        menu.style.left = '';
        menu.style.width = '';
        menu.style.maxWidth = '';
        menu.style.height = '';
        menu.style.background = '';
        menu.style.borderRight = '';
        menu.style.padding = '';
        menu.style.overflowY = '';
        menu.style.overflowX = '';
        menu.style.zIndex = '';
        menu.style.boxShadow = '';
        menu.style.visibility = '';
        menu.style.pointerEvents = '';
      }
    } 
    // wiki-menu2の場合は専用クラスのみを追加（lab.html用）
    else if (menu.classList.contains('wiki-menu2')) {
      toggleBtn.className = 'wiki-menu2-toggle';
      
      // スマホサイズ（899px以下）の場合のみインラインスタイルを適用
      if (window.innerWidth <= 899) {
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '-100%';
        menu.style.width = '80%';
        menu.style.maxWidth = '300px';
        menu.style.height = '100vh';
        menu.style.background = 'rgba(255, 255, 255, 0.98)';
        menu.style.borderRight = '1px solid #a2a9b1';
        menu.style.padding = '1rem 1rem 1rem 1rem';
        menu.style.overflowY = 'auto';
        menu.style.overflowX = 'hidden';
        menu.style.zIndex = '10300';
        menu.style.boxShadow = '2px 0 10px rgba(0, 0, 0, 0.1)';
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
        // スマホサイズでJavaScript実行済みマークを追加
        menu.classList.add('js-initialized');
      } else {
        // PC表示ではインラインスタイルを完全にクリア
        menu.style.position = '';
        menu.style.top = '';
        menu.style.left = '';
        menu.style.width = '';
        menu.style.maxWidth = '';
        menu.style.height = '';
        menu.style.background = '';
        menu.style.borderRight = '';
        menu.style.padding = '';
        menu.style.overflowY = '';
        menu.style.overflowX = '';
        menu.style.zIndex = '';
        menu.style.boxShadow = '';
        menu.style.visibility = '';
        menu.style.pointerEvents = '';
      }
    } 
    else {
      toggleBtn.className = 'wiki-menu-toggle';
    }
    
    toggleBtn.setAttribute('aria-label', 'メニューを開く');
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    toggleBtn.style.opacity = '1';
    toggleBtn.style.transition = 'none';
    
    document.body.appendChild(toggleBtn);
    
    requestAnimationFrame(() => {
      toggleBtn.style.transition = '';
    });
    
    const closeMenu = () => {
      console.log('🔴 closeMenu実行:', menu.className);
      toggleBtn.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
      
      // wiki-menu1の場合でスマホサイズの時のみインラインスタイル更新
      if (menu.classList.contains('wiki-menu1') && window.innerWidth <= 899) {
        menu.style.left = '-100%';
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
        menu.style.opacity = '0';
        
        // JavaScriptで追加したmargin-bottomをリセット
        const lastElement = menu.lastElementChild;
        if (lastElement && lastElement.style.marginBottom) {
          lastElement.style.marginBottom = '';
        }
      }
      
      // ★メニューを元の位置に戻す（視覚的に非表示にした後に実行）
      if (menu._originalParent && menu.parentElement === document.body) {
        console.log('🔄 wiki-menuを元の位置に戻す');
        menu._originalParent.appendChild(menu);
      }
      
      // wiki-menu2の場合でスマホサイズの時のみインラインスタイル更新
      if (menu.classList.contains('wiki-menu2') && window.innerWidth <= 899) {
        menu.style.left = '-100%';
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
      }
    };

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🔵 ボタンクリック - 現在の状態:', toggleBtn.classList.contains('active'));
      
      // toggleではなく明示的にactiveの有無をチェック
      const isCurrentlyActive = toggleBtn.classList.contains('active');
      
      if (isCurrentlyActive) {
        // 現在開いている → 閉じる
        console.log('🔵 メニューを閉じる');
        closeMenu();
      } else {
        // 現在閉じている → 開く
        console.log('🔵 メニューを開く');
        toggleBtn.classList.add('active');
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
        
        // ★メニューを一時的にbody直下に移動（z-indexを確実に機能させるため）
        // 元の親要素への参照を保存
        if (menu.parentElement !== document.body) {
          menu._originalParent = menu.parentElement;
          console.log('💾 元の親要素を保存:', menu._originalParent.className || menu._originalParent.tagName);
          document.body.appendChild(menu);
        }
        
        // wiki-menu1の場合でスマホサイズの時のみインラインスタイル更新
        if (menu.classList.contains('wiki-menu1') && window.innerWidth <= 899) {
          menu.style.display = 'block';
          menu.style.left = '0';
          menu.style.visibility = 'visible';
          menu.style.pointerEvents = 'auto';
          menu.style.opacity = '1';
          menu.style.overflowY = 'scroll';
          menu.style.webkitOverflowScrolling = 'touch';
          menu.style.overscrollBehavior = 'auto';
          menu.style.overscrollBehaviorY = 'auto';
          menu.style.touchAction = 'pan-y';
          menu.style.paddingTop = '0'; // padding-topを0に強制設定
          
          // 最初の子要素のmarginとpaddingも削除
          const firstChild = menu.firstElementChild;
          if (firstChild) {
            firstChild.style.marginTop = '0';
            firstChild.style.paddingTop = '0';
          }
          
          // Androidのスクロール問題対策：最後の要素に余白を追加（画面高さの35%）
          requestAnimationFrame(() => {
            const lastElement = menu.lastElementChild;
            if (lastElement) {
              lastElement.style.marginBottom = '35vh';
            }
          });
        }
        
        // wiki-menu2の場合でスマホサイズの時のみインラインスタイル更新
        if (menu.classList.contains('wiki-menu2') && window.innerWidth <= 899) {
          menu.style.left = '0';
          menu.style.visibility = 'visible';
          menu.style.pointerEvents = 'auto';
        }
      }
    });
    
    // ★navメニューと同じ方式：document全体のクリックを監視
    // イベントリスナーに一意のマークを付けて重複登録を防ぐ
    const eventHandler = (e) => {
      if (menu.classList.contains('active')) {
        // メニュー外をクリックした場合
        if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
          console.log('🟡 メニュー外クリック検出');
          
          // ★リンクをクリックした場合は、ページ遷移を防いでメニューを閉じる
          const clickedLink = e.target.closest('a');
          if (clickedLink) {
            console.log('🔗 メニュー外リンククリック検出 - ページ遷移を防止:', clickedLink.textContent);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            // リンククリック時はcloseMenuだけ実行（ボタンは削除しない）
            closeMenu();
          } else {
            // リンク以外のクリック（通常の閉じる動作）
            closeMenu();
          }
        }
      }
    };
    
    // このメニュー用のイベントリスナーを保存
    toggleBtn._documentClickHandler = eventHandler;
    menu._documentClickHandler = eventHandler;  // ★menu要素にも保存
    // ★captureフェーズで登録（リンクのクリックイベントより先に実行される）
    document.addEventListener('click', eventHandler, true);
    
    // ★menu内クリックイベントハンドラーを名前付き関数として定義
    const menuClickHandler = (e) => {
      const link = e.target.closest('a');
      if (link) {
        console.log('🔗 wiki-menuリンククリック:', link.textContent, 'メニュークラス:', menu.className);
        
        // リンクのhref属性を取得
        const href = link.getAttribute('href');
        const hasLoadPart = link.getAttribute('onclick') && link.getAttribute('onclick').includes('loadPart');
        
        // ★wiki-menu1のloadPartリンクの場合は最小限の処理のみ（チラつき防止）
        // activeクラスを削除しないと、次のクリックがeventHandlerで無効化される
        if (menu.classList.contains('wiki-menu1') && hasLoadPart && window.innerWidth <= 899) {
          console.log('✅ wiki-menu1 loadPartリンク - activeクラスのみ削除');
          
          // activeクラスとbody設定だけリセット（チラつき防止のため、DOM操作は最小限）
          toggleBtn.classList.remove('active');
          menu.classList.remove('active');
          document.body.style.overflow = '';
          document.body.classList.remove('menu-open');
          
          // JavaScriptで追加したmargin-bottomをリセット
          const lastElement = menu.lastElementChild;
          if (lastElement && lastElement.style.marginBottom) {
            lastElement.style.marginBottom = '';
          }
          
          return; // 他の処理はloadPartに任せる
        }
        
        // ページ内リンク（#で始まる）かloadPart呼び出しかを判定
        const isInPageLink = href && href.startsWith('#') && !href.includes('loadPart');
        
        console.log('🔗 ページ内リンク:', isInPageLink, 'loadPart:', hasLoadPart);
        
        // wiki-menu1以外は通常通りcloseMenu
        closeMenu();
        
        // ★ページ内リンクの場合はクリーンアップしない（ボタンを残す）
        if (isInPageLink) {
          console.log('✅ ページ内リンク - ボタンを残す');
          return;
        }
        
        // ★loadPartを使うリンクの場合のみクリーンアップ
        if (hasLoadPart) {
          console.log('🧹 loadPartリンク - クリーンアップはloadPart()内で実行されます');
          // loadPart()内でボタンとメニューは削除されるので、ここでは何もしない
        }
      }
    };
    
    // ★menu要素にイベントハンドラーを保存して後で削除できるようにする
    menu._menuClickHandler = menuClickHandler;
    // ★captureフェーズで実行（onclick属性より先に実行され、チラつき防止）
    menu.addEventListener('click', menuClickHandler, true);
  });
}



// ========================================
// navリンクとtab-menuのアクティブ状態管理 - デバッグ版
// ========================================
(function() {
  console.log('🟢 アクティブ管理スクリプト開始');
  
  // 現在のページパスを取得
  let currentActivePage = window.location.pathname;
  
  // パスが'/'の場合は'/index.html'として扱う
  if (currentActivePage === '/' || currentActivePage === '') {
    currentActivePage = '/index.html';
  }
  
  console.log('🟢 初期ページ:', currentActivePage);

  document.addEventListener('DOMContentLoaded', function() {
    console.log('🟢 DOMContentLoaded');
    setTimeout(() => {
      console.log('🟢 初期化タイマー実行');
      updateActiveNav(currentActivePage);
    }, 1000);
  });

  document.addEventListener('click', function(e) {
    const logo = e.target.closest('.logo, .logo-image');
    if (logo) {
      console.log('🟣 ロゴクリック');
      currentActivePage = '/index.html';
      updateActiveNav(currentActivePage); // 即座に実行（遅延なし）
      return;
    }
    
    const navLink = e.target.closest('nav ul li a.nav');
    if (navLink) {
      console.log('🟢 navリンククリック:', navLink.textContent);
      const onclick = navLink.getAttribute('onclick');
      if (onclick) {
        const match = onclick.match(/loadPart\(['"]content['"],\s*['"]([^'"]+)['"]/);
        if (match) {
          currentActivePage = match[1];
          console.log('🟢 アクティブページ更新:', currentActivePage);
          updateActiveNav(currentActivePage); // 即座に実行（遅延なし）
        }
      }
      return;
    }
  }, false);

  let lastContentUpdate = 0;
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.id === 'header' && mutation.addedNodes.length > 0) {
        console.log('🔄 ヘッダー更新検知');
        setTimeout(() => updateActiveNav(currentActivePage), 100);
      }
    });
  });

  const headerEl = document.getElementById('header');
  if (headerEl) observer.observe(headerEl, { childList: true, subtree: true });

  function updateActiveNav(activePath) {
    console.log('📍 updateActiveNav実行:', activePath);
    const navLinks = document.querySelectorAll('nav ul li a.nav');
    console.log('📍 navリンク数:', navLinks.length);
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.style.textDecoration = '';
      link.style.textDecorationColor = '';
      
      const onclick = link.getAttribute('onclick');
      if (onclick) {
        const match = onclick.match(/loadPart\(['"]content['"],\s*['"]([^'"]+)['"]/);
        if (match && match[1] === activePath) {
          console.log('✅ アクティブ設定:', link.textContent);
          link.classList.add('active');
          link.style.textDecoration = 'underline';
          link.style.textDecorationColor = '#000';
        }
      }
    });
  }
  
  console.log('🟢 アクティブ管理スクリプト準備完了');
})();
// ウィンドウリサイズ時にwiki-menu1のスタイルを更新
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initWikiMenuHamburger();
    // リサイズ時にアコーディオンの状態を更新
    openAutoExpandAccordions();
  }, 100);
});

// data-auto-open="true"属性を持つアコーディオンを開く関数
function openAutoExpandAccordions() {
  const autoOpenToggles = document.querySelectorAll('.accordion-toggle[data-auto-open="true"]');
  console.log('🔍 自動展開対象:', autoOpenToggles.length);
  
  // 現在の画面サイズを取得
  const isPC = window.innerWidth > 899;
  console.log('📱 画面サイズ:', isPC ? 'PC' : 'スマホ');
  
  autoOpenToggles.forEach(toggle => {
    console.log('🔧 処理中:', toggle);
    
    // wiki-main内のアコーディオンかどうかを判定
    const isInWikiMain = toggle.closest('.wiki-main') !== null;
    console.log('📍 wiki-main内:', isInWikiMain);
    
    // accordion-toggleの次の要素（accordion-content）を取得
    let content = toggle.nextElementSibling;
    
    // 直接の次の要素でない場合は、親要素の次の要素を探す
    if (!content || !content.classList.contains('accordion-content')) {
      const parent = toggle.parentElement;
      content = parent ? parent.nextElementSibling : null;
    }
    
    console.log('📦 コンテンツ:', content);
    
    if (!content || !content.classList.contains('accordion-content')) {
      return;
    }
    
    // wiki-main内のアコーディオンの場合、画面サイズに応じて処理
    if (isInWikiMain) {
      if (isPC) {
        // PCの場合は開く
        toggle.setAttribute('aria-expanded', 'true');
        const arrow = toggle.querySelector('.arrow');
        if (arrow) {
          arrow.textContent = '▼';
        }
        content.classList.add('open');
        console.log('✅ PCでwiki-mainアコーディオン展開');
      } else {
        // スマホの場合は閉じる
        toggle.setAttribute('aria-expanded', 'false');
        const arrow = toggle.querySelector('.arrow');
        if (arrow) {
          arrow.textContent = '▶';
        }
        content.classList.remove('open');
        console.log('📱 スマホでwiki-mainアコーディオンを閉じる');
      }
    } else {
      // wiki-menu内のアコーディオンは常に開く
      toggle.setAttribute('aria-expanded', 'true');
      const arrow = toggle.querySelector('.arrow');
      if (arrow) {
        arrow.textContent = '▼';
      }
      content.classList.add('open');
      console.log('✅ wiki-menuアコーディオン展開');
    }
  });
}

// ハンバーガーメニューの開閉処理
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger_menu');
  const nav = document.querySelector('nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      // メニューとボタンのactiveクラスをトグル
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // メニュー内のリンクをクリックしたらメニューを閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ページ読み込み時にアコーディオンを開く
  console.log('🟢 DOMContentLoaded - アコーディオン初期化開始');
  openAutoExpandAccordions();
  
  // タブシステムの初期化
  const initializeTabs = () => {
    const allRadios = document.querySelectorAll('input[type="radio"][name="tab-radio"]');
    
    if (allRadios.length === 0) {
      console.log('⚠️ タブラジオボタンが見つかりません');
      return;
    }
    
    console.log('📻 タブシステム検出 - ラジオボタン数:', allRadios.length);
    
    const hash = window.location.hash;
    
    if (hash && hash.startsWith('#tabContent')) {
      // ハッシュがある場合は指定されたタブを開く
      console.log('🔗 ハッシュ検出:', hash);
      
      const radioId = hash.substring(1).replace('tabContent', 'tab');
      console.log('🎯 変換後のID:', radioId);
      
      const radioButton = document.getElementById(radioId);
      console.log('📻 対象ラジオボタン:', radioId, radioButton ? 'found' : 'not found');
      
      if (radioButton) {
        // すべてのラジオボタンのchecked属性を削除してからuncheckedに
        allRadios.forEach(radio => {
          radio.removeAttribute('checked');
          radio.checked = false;
        });
        
        console.log('🔍 切り替え前の状態:');
        allRadios.forEach(radio => {
          console.log(`  - ${radio.id}: checked=${radio.checked}`);
        });
        
        // 指定されたタブをチェック
        radioButton.checked = true;
        
        console.log('🔍 切り替え後の状態:');
        allRadios.forEach(radio => {
          console.log(`  - ${radio.id}: checked=${radio.checked}`);
        });
        
        console.log('✅ タブ切り替え完了:', radioId);
      }
    } else {
      // ハッシュがない場合、HTMLのchecked属性を尊重する
      console.log('📌 ハッシュなし - HTMLのchecked属性を確認');
      
      // HTMLにchecked属性があるラジオボタンを探す
      const checkedRadio = document.querySelector('input[type="radio"][name="tab-radio"][checked]');
      
      if (checkedRadio) {
        // HTMLにchecked属性がある場合、それをJavaScriptでも適用
        allRadios.forEach(radio => {
          radio.checked = false;
        });
        checkedRadio.checked = true;
        console.log('✅ HTMLのchecked属性を適用:', checkedRadio.id);
      } else {
        // HTMLにchecked属性がない場合のみtab01をデフォルトにする
        console.log('📌 checked属性なし - デフォルトタブ(tab01)を開く');
        allRadios.forEach(radio => {
          radio.removeAttribute('checked');
          radio.checked = false;
        });
        
        const firstTab = document.getElementById('tab01');
        if (firstTab) {
          firstTab.checked = true;
          console.log('✅ デフォルトタブ(tab01)を開きました');
        }
      }
    }
  };
  
  // 即座に実行 + バックアップで1回のみ
  initializeTabs();
  setTimeout(initializeTabs, 50);
});

// ページ読み込み完了後にも実行（バックアップ）
window.addEventListener('load', function() {
  console.log('🟢 window.load - アコーディオン初期化開始');
  openAutoExpandAccordions();
});
// infobox→main順序を適用する関数（blackpink/twice/lab/aidol配下用）
function applySpecialPageMenuOrder() {
  console.log('📋 infobox→main順序を適用開始');
  console.log('  - ウィンドウ幅:', window.innerWidth);
  console.log('  - URL:', window.location.href);
  
  const infoboxes = document.querySelectorAll('.wiki-infobox');
  const menus = document.querySelectorAll('.wiki-menu, .wiki-menu1');
  const mains = document.querySelectorAll('.wiki-main');
  
  console.log('🔍 要素検索結果:');
  console.log('  - infoboxes数:', infoboxes.length);
  console.log('  - menus数:', menus.length);
  console.log('  - mains数:', mains.length);
  
  if (infoboxes.length === 0 && menus.length === 0 && mains.length === 0) {
    console.log('⚠️ wiki要素が1つも見つかりません！DOMがまだ準備できていない可能性があります');
    return;
  }
  
  // スマホサイズの場合のみ適用
  if (window.innerWidth <= 899) {
    console.log('✅ スマホサイズ検出 - order適用開始');
    
    // ★即座に順序を適用（requestAnimationFrameを使わない）
    infoboxes.forEach((el, index) => {
      el.style.order = '1';
      console.log(`  ✓ infobox[${index}] order設定: ${el.className}`);
    });
    mains.forEach((el, index) => {
      el.style.order = '2';
      console.log(`  ✓ main[${index}] order設定: ${el.className}`);
    });
    menus.forEach((el, index) => {
      el.style.order = '3';
      console.log(`  ✓ menu[${index}] order設定: ${el.className}`);
    });
    
    console.log('✅ 順序適用完了: infobox(1), main(2), menu(3)');
    
    // 適用後の確認
    setTimeout(() => {
      console.log('🔍 適用確認（100ms後）:');
      infoboxes.forEach((el, i) => console.log(`  - infobox[${i}].style.order = "${el.style.order}"`));
      mains.forEach((el, i) => console.log(`  - main[${i}].style.order = "${el.style.order}"`));
      menus.forEach((el, i) => console.log(`  - menu[${i}].style.order = "${el.style.order}"`));
    }, 100);
  } else {
    // PCサイズの場合は順序をリセット
    infoboxes.forEach(el => el.style.order = '');
    menus.forEach(el => el.style.order = '');
    mains.forEach(el => el.style.order = '');
    
    console.log('✅ PCサイズ: 順序リセット');
  }
}

// 特別な順序を削除する関数
function removeSpecialPageMenuOrder() {
  console.log('📋 特別なwiki-menu順序を削除');
  
  const infoboxes = document.querySelectorAll('.wiki-infobox');
  const menus = document.querySelectorAll('.wiki-menu, .wiki-menu1');
  const mains = document.querySelectorAll('.wiki-main');
  
  infoboxes.forEach(el => el.style.order = '');
  menus.forEach(el => el.style.order = '');
  mains.forEach(el => el.style.order = '');
  
  console.log('✅ 順序リセット完了');
}

// ウィンドウリサイズ時に表示順序を再適用
let orderResizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(orderResizeTimer);
  orderResizeTimer = setTimeout(function() {
    console.log('📐 リサイズ検出 - 現在のURL:', currentLoadedUrl);
    console.log('📐 ウィンドウ幅:', window.innerWidth);
    
    // ★currentLoadedUrlを使用（window.locationではなく）
    if (currentLoadedUrl.includes('blackpink.html') || 
        currentLoadedUrl.includes('twice.html') ||
        currentLoadedUrl.includes('/lab/aidol/')) {
      console.log('✅ リサイズ: 特別ページ - 順序適用');
      applySpecialPageMenuOrder();
    } else {
      console.log('📋 リサイズ: 通常ページ - 順序リセット');
      removeSpecialPageMenuOrder();
    }
  }, 100);
});

// ※注意: contentObserverは無効化
// loadPart関数内のsetTimeoutで順序を制御するため、
// このObserverは不要（競合を防ぐため削除）

// DOMContentLoaded時の初期ロード処理のみ実行
document.addEventListener('DOMContentLoaded', function() {
  // 初期ロード時にも適用チェック（直接アクセスの場合）
  const initialHash = window.location.hash.substring(1);
  const initialPath = window.location.pathname;
  
  // ★初期URLを保存
  currentLoadedUrl = initialPath;
  
  console.log('🟢 DOMContentLoaded - 初期チェック', {initialHash, initialPath});
  
  if (initialHash.includes('lab/aidol/') || 
      initialHash.includes('blackpink') || 
      initialHash.includes('twice') ||
      initialPath.includes('blackpink.html') || 
      initialPath.includes('twice.html') ||
      initialPath.includes('/lab/aidol/')) {
    console.log('✅ 初期ロード: 特別ページ検出');
    setTimeout(() => {
      applySpecialPageMenuOrder();
    }, 100);
  }
});
// ページ読み込み時にも画像ギャラリーのスタイルを適用（直接アクセス対応）
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 DOMContentLoaded: 画像ギャラリースタイル適用開始');
  
  // /lab/配下のページの場合
  if (window.location.pathname.includes('/lab/')) {
    console.log('✅ /lab/配下のページを検出');
    
    // 画像ギャラリーのスタイルを強制適用
    document.querySelectorAll('ul.image-gallery').forEach(gallery => {
        console.log('🖼️ 画像ギャラリー発見:', gallery);
        
        gallery.style.setProperty('display', 'flex', 'important');
        gallery.style.setProperty('flex-direction', 'row', 'important');
        gallery.style.setProperty('flex-wrap', 'wrap', 'important');
        gallery.style.setProperty('gap', '20px', 'important');
        gallery.style.setProperty('list-style', 'none', 'important');
        gallery.style.setProperty('padding', '0', 'important');
        gallery.style.setProperty('margin', '20px 0', 'important');
        
        const items = gallery.querySelectorAll('li');
        items.forEach(item => {
            item.style.setProperty('flex', '0 0 auto', 'important');
            item.style.setProperty('display', 'inline-block', 'important');
        });
        
        const images = gallery.querySelectorAll('img');
        images.forEach(img => {
            img.style.setProperty('display', 'block', 'important');
            img.style.setProperty('max-width', '100%', 'important');
            img.style.setProperty('height', 'auto', 'important');
        });
        
        console.log('✅ 画像ギャラリースタイル適用完了');
    });
  }
});