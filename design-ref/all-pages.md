==========================================
### FILE: 01-پیشتم، خانه.html
### TITLE: پیشتم، خانه
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const price = money(Number(this.props.price ?? 890000));
    const nextNo = fa(Number(this.props.nextNo ?? 101));
    return {
      nextNo,
      products: [
        { kind: 'bear', name: 'کِرِمی', traits: 'بغلی · آروم · شیرین', bg: '#FFE8D1', price },
        { kind: 'bunny', name: 'لپ‌قندی', traits: 'شیطون · بازیگوش', bg: '#FFE0EA', price },
        { kind: 'cat', name: 'میشی', traits: 'ناز · کم‌حرف · لوس', bg: '#E7E0FA', price },
        { kind: 'panda', name: 'بامبو', traits: 'خوابالو · مهربون', bg: '#DDF3EA', price },
        { kind: 'sheep', name: 'ابری', traits: 'نرم · خندون · پفی', bg: '#FFF3C9', price },
        { kind: 'duck', name: 'قات‌قات', traits: 'شاد · پر‌سروصدا', bg: '#D7F1FB', price },
      ],
      steps: [
        { n: '۱', title: 'دوستت رو انتخاب کن', body: 'از بین شش تا دوست پشمالو یکی رو بردار. همه‌شون یه قیمت دارن، پس فقط به دلت گوش بده.', bg: '#CDEFFB' },
        { n: '۲', title: 'کارت پستالت رو بنویس', body: 'پیامت رو بنویس، عکس یا ویدیو بذار و یه رمز انتخاب کن. دوستت با اسکن QR کارت، همه‌ش رو می‌بینه.', bg: '#FFE0EA' },
        { n: '۳', title: 'ما می‌فرستیم، تو لذتشو ببر', body: 'جعبه‌ی کادویی با شماره‌ی هدیه می‌رسه دستش. اگه بخوای، بدون اسم تو می‌رسه.', bg: '#FFF3C9' },
      ],
      trust: [
        { icon: '♥', title: 'یه قیمت برای همه', body: 'مهربونی وزن نداره' },
        { icon: '✓', title: 'ناشناس هم می‌شه', body: 'اسمت رو ننویسی، نمی‌دونه کی بوده' },
        { icon: '★', title: 'کارتِ رمزدار', body: 'فقط خودش پیامت رو می‌بینه' },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 2200px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 10px">
<dc-import name="Logo" size="38" hint-size="130px,38px"></dc-import>
<div style="display: flex; gap: 10px; align-items: center">
<a href="M-Impact.dc.html" aria-label="دفتر مهربونی" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>
</a>
<a href="M-Checkout.dc.html" aria-label="سبد خرید" style="position: relative; width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20 8H6"></path><circle cx="9.5" cy="20" r="1.3"></circle><circle cx="17" cy="20" r="1.3"></circle></svg>
<span style="position: absolute; top: -3px; left: -3px; min-width: 18px; height: 18px; border-radius: 9px; background: #00ABE7; color: #04202E; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center">۱</span>
</a>
</div>
</div>

<div style="margin: 8px 20px 0; position: relative; overflow: hidden; border-radius: 32px; background: #00ABE7; padding: 24px 22px 0; min-height: 520px; box-sizing: border-box">
<div style="position: absolute; left: -40px; bottom: -50px; width: 290px; height: 290px; border-radius: 145px; background: #66CDF1"></div>
<svg style="position: absolute; top: 18px; left: 22px" width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round" transform="rotate(-12)"></path></svg>
<svg style="position: absolute; top: 290px; left: 130px" width="22" height="22" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round" transform="rotate(14)"></path></svg>
<div style="position: relative; display: flex; flex-direction: column; gap: 14px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 14px">ویژه‌ی دخترای مهربون</span>
<h1 style="margin: 0; font-size: 36px; line-height: 1.4; font-weight: 900; color: #04202E">می‌خوای یکی رو خوشحال کنی؟</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #04202E; max-width: 300px">یه دوست پشمالو، یه کارت پستال با پیام قشنگ خودت و یه عالمه مهربونی؛ درست می‌فرستیمش دم در خونه‌ی دوستت.</p>
<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px">
<a href="M-Pick.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 16px; font-weight: 800; height: 52px; padding: 0 26px; border-radius: 26px; display: flex; align-items: center">بساز و بفرست</a>
<a href="#how" style="text-decoration: none; border: 2px solid #04202E; color: #04202E; font-size: 15px; font-weight: 700; height: 52px; box-sizing: border-box; padding: 0 20px; border-radius: 26px; display: flex; align-items: center">چطوری کار می‌کنه؟</a>
</div>
</div>
<div style="position: absolute; left: 6px; bottom: -6px">
<dc-import name="Plush" kind="bear" size="230" hint-size="230px,230px"></dc-import>
</div>
<div style="position: absolute; right: 22px; bottom: 34px; transform: rotate(-6deg); background: #fff; border: 2.5px solid #04202E; border-radius: 16px; padding: 8px 14px 6px; text-align: center">
<div style="font-size: 11px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 30px; font-weight: 900; line-height: 1.1; color: #04202E">{{nextNo}}</div>
</div>
</div>

<div style="margin: 14px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 14px 16px; display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 84px; height: 72px; border-radius: 18px; background: #E3F6FD; border: 2px dashed #00ABE7; display: flex; flex-direction: column; align-items: center; justify-content: center">
<span style="font-size: 11px; font-weight: 700; color: #006387">شماره‌ی بعدی</span>
<span style="font-size: 28px; font-weight: 900; color: #04202E; line-height: 1.15">{{nextNo}}</span>
</div>
<div style="font-size: 13.5px; line-height: 1.9; font-weight: 500; color: #1F3E4D">هر هدیه یه شماره‌ی مخصوص خودش رو داره؛ همون شماره روی جعبه و کارت پستال می‌شینه. شماره‌ی بعدی مال کیه؟ شاید دوستت!</div>
</div>

<div id="how" style="display: flex; align-items: baseline; justify-content: space-between; padding: 30px 20px 12px">
<h2 style="margin: 0; font-size: 22px; font-weight: 800">چطوری کار می‌کنه؟</h2>
<span style="font-size: 13px; font-weight: 600; color: #4A6572">سه قدم ساده</span>
</div>
<div style="display: flex; gap: 12px; overflow-x: auto; padding: 4px 20px 8px">
<sc-for list="{{steps}}" as="s" hint-placeholder-count="3">
<div style="flex: 0 0 280px; box-sizing: border-box; min-height: 190px; border-radius: 26px; padding: 20px; background: {{s.bg}}; display: flex; flex-direction: column; gap: 10px">
<div style="width: 40px; height: 40px; border-radius: 20px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px">{{s.n}}</div>
<div style="font-size: 19px; font-weight: 800">{{s.title}}</div>
<div style="font-size: 14px; line-height: 1.85; font-weight: 500; color: #1F3E4D">{{s.body}}</div>
</div>
</sc-for>
</div>

<div style="display: flex; align-items: baseline; justify-content: space-between; padding: 26px 20px 12px">
<h2 style="margin: 0; font-size: 22px; font-weight: 800">دوست‌های پشمالو</h2>
<a href="M-Pick.dc.html" style="font-size: 14px; font-weight: 700; color: #006387; text-decoration: none">همه‌شون ›</a>
</div>
<div style="display: flex; gap: 12px; overflow-x: auto; padding: 4px 20px 12px">
<sc-for list="{{products}}" as="p" hint-placeholder-count="6">
<a href="M-Pick.dc.html" style="flex: 0 0 160px; box-sizing: border-box; text-decoration: none; color: #04202E; background: #fff; border-radius: 24px; padding: 10px 10px 14px; border: 1px solid #DDEEF5; display: flex; flex-direction: column; gap: 6px">
<div style="height: 140px; border-radius: 18px; background: {{p.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{p.kind}}" size="124" hint-size="124px,124px"></dc-import>
</div>
<div style="font-size: 16px; font-weight: 800; padding-top: 4px">{{p.name}}</div>
<div style="font-size: 12px; color: #4A6572; font-weight: 500">{{p.traits}}</div>
<div style="font-size: 13px; font-weight: 800; color: #006387">{{p.price}} تومان</div>
</a>
</sc-for>
</div>

<div style="margin: 22px 0 0; background: #04202E; color: #fff; padding: 12px 0; overflow: hidden; white-space: nowrap; font-size: 16px; font-weight: 800; display: flex; gap: 22px; align-items: center">
<span>یه بغل، تو یه جعبه</span><span style="color: #F0426B">♥</span><span>یه بغل، تو یه جعبه</span><span style="color: #00ABE7">♥</span><span>یه بغل، تو یه جعبه</span><span style="color: #F0426B">♥</span><span>یه بغل، تو یه جعبه</span>
</div>

<div style="margin: 26px 20px 0; border-radius: 30px; background: #04202E; color: #fff; padding: 26px 22px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; gap: 10px">
<span style="width: 52px; height: 52px; border-radius: 26px; background: #F0426B; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff"></path></svg>
</span>
<span style="width: 52px; height: 52px; border-radius: 26px; background: #00ABE7; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="#04202E" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</span>
</div>
<h2 style="margin: 0; font-size: 24px; line-height: 1.5; font-weight: 900">با هر قلب، یه هدیه می‌ره پیش یه بچه</h2>
<p style="margin: 0; font-size: 14.5px; line-height: 1.95; font-weight: 500; color: #D3EEF9">قلب قرمز و پنجه رو می‌تونی هر چندتا که دلت خواست روی جعبه‌ت بچسبونی. پولش می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا؛ مدارکش رو هم همیشه همین‌جا می‌ذاریم.</p>
<a href="M-Impact.dc.html" style="text-decoration: none; align-self: flex-start; background: #00ABE7; color: #04202E; font-weight: 800; font-size: 15px; height: 48px; padding: 0 22px; border-radius: 24px; display: flex; align-items: center">دفتر مهربونی رو ببین</a>
</div>

<div style="display: flex; gap: 10px; padding: 22px 20px 0">
<sc-for list="{{trust}}" as="t" hint-placeholder-count="3">
<div style="flex: 1; box-sizing: border-box; background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center">
<div style="width: 44px; height: 44px; border-radius: 22px; background: #D6F1FB; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #04202E">{{t.icon}}</div>
<div style="font-size: 14px; font-weight: 800">{{t.title}}</div>
<div style="font-size: 12px; line-height: 1.7; color: #4A6572; font-weight: 500">{{t.body}}</div>
</div>
</sc-for>
</div>

<div style="padding: 26px 20px 0; text-align: center; font-size: 12.5px; color: #4A6572; font-weight: 500">پیشتم · یه بغل، تو یه جعبه</div>

<nav aria-label="ناوبری اصلی" style="margin-top: auto; background: rgba(255,255,255,0.94); border-top: 1px solid #D3E8F0; padding: 8px 12px 26px; display: flex; justify-content: space-between; align-items: flex-end">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #006387; font-size: 11px; font-weight: 800">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z"></path></svg>دوست‌ها</a>
<a href="M-Pick.dc.html" aria-label="ساخت هدیه" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #04202E; font-size: 11px; font-weight: 800; margin-top: -30px">
<span style="width: 58px; height: 58px; border-radius: 29px; background: #00ABE7; border: 4px solid #fff; box-shadow: 0 6px 16px rgba(0,171,231,0.35); display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span>بساز</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 02-انتخاب دوست پشمالو.html
### TITLE: انتخاب دوست پشمالو
### SCRIPT:

class Component extends DCLogic {
  state = { picked: 'bear' };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const price = money(Number(this.props.price ?? 890000));
    const list = [
      { kind: 'bear', name: 'کِرِمی', chips: ['بغلی', 'آروم', 'شیرین'], bg: '#FFE8D1', blurb: 'کِرِمی برای روزای دلتنگی ساخته شده؛ یه بغل گرم که هیچ‌وقت خسته نمی‌شه.' },
      { kind: 'bunny', name: 'لپ‌قندی', chips: ['شیطون', 'بازیگوش', 'پرانرژی'], bg: '#FFE0EA', blurb: 'لپ‌قندی همیشه یه خبر خوب تو گوشش داره و می‌خواد با تو تقسیمش کنه.' },
      { kind: 'cat', name: 'میشی', chips: ['ناز', 'کم‌حرف', 'لوس'], bg: '#E7E0FA', blurb: 'میشی با یه نگاه می‌فهمه حالت چطوره و بی‌سروصدا کنارت می‌شینه.' },
      { kind: 'panda', name: 'بامبو', chips: ['خوابالو', 'مهربون', 'آروم'], bg: '#DDF3EA', blurb: 'بامبو استاد چرت‌های وسط روزه؛ برای دوستی که خسته‌ست عالیه.' },
      { kind: 'sheep', name: 'ابری', chips: ['نرم', 'خندون', 'پفی'], bg: '#FFF3C9', blurb: 'ابری مثل یه تیکه ابره؛ فقط باید محکم بغلش کنی.' },
      { kind: 'duck', name: 'قات‌قات', chips: ['شاد', 'پرسروصدا', 'سرحال'], bg: '#D7F1FB', blurb: 'قات‌قات حال هر جمعی رو خوب می‌کنه، حتی تو روزای بارونی.' },
    ];
    const picked = this.state.picked;
    const items = list.map((x) => ({
      ...x,
      traits: x.chips.join(' · '),
      isOn: x.kind === picked,
      border: x.kind === picked ? '#00ABE7' : '#E1EFF5',
      pick: () => this.setState({ picked: x.kind }),
    }));
    return { price, items, sel: list.find((x) => x.kind === picked) || list[0] };
  }
}

### BODY:

<div style="width: 390px; min-height: 1280px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<span style="font-size: 14px; font-weight: 700; color: #4A6572">قدم ۱ از ۴</span>
</div>
<div style="display: flex; gap: 6px; padding: 8px 20px 0">
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
</div>

<div style="padding: 22px 20px 4px">
<h1 style="margin: 0; font-size: 32px; line-height: 1.4; font-weight: 900">دوستت رو انتخاب کن</h1>
<p style="margin: 8px 0 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">همه‌شون یه قیمتن، <b style="color: #006387">{{price}} تومان</b>؛ پس فقط به دلت گوش بده.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 14px 20px 0">
<sc-for list="{{items}}" as="p" hint-placeholder-count="6">
<button type="button" sc-camel-on-click="{{p.pick}}" aria-pressed="{{p.isOn}}" style="position: relative; text-align: right; cursor: pointer; background: #fff; border-radius: 24px; padding: 10px 10px 12px; border: 3px solid {{p.border}}; display: flex; flex-direction: column; gap: 4px; color: #04202E">
<div style="height: 142px; border-radius: 16px; background: {{p.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{p.kind}}" size="128" hint-size="128px,128px"></dc-import>
</div>
<div style="font-size: 17px; font-weight: 800; padding-top: 6px">{{p.name}}</div>
<div style="font-size: 12px; font-weight: 500; color: #4A6572">{{p.traits}}</div>
<sc-if value="{{p.isOn}}" hint-placeholder-val="{{ false }}">
<span style="position: absolute; top: 16px; left: 16px; width: 30px; height: 30px; border-radius: 15px; background: #00ABE7; border: 2.5px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="16" height="16" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>
</span>
</sc-if>
</button>
</sc-for>
</div>

<div style="margin: 16px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 16px 18px; display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 18px; font-weight: 800">{{sel.name}}</span>
<span style="font-size: 12px; font-weight: 700; color: #006387">انتخاب تو</span>
</div>
<div style="display: flex; gap: 8px">
<sc-for list="{{sel.chips}}" as="c" hint-placeholder-count="3">
<span style="background: #D6F1FB; color: #04202E; font-size: 12.5px; font-weight: 700; padding: 6px 12px; border-radius: 14px">{{c}}</span>
</sc-for>
</div>
<p style="margin: 0; font-size: 14px; line-height: 1.9; font-weight: 500; color: #1F3E4D">{{sel.blurb}}</p>
</div>

<div style="margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 14px 20px 30px; display: flex; align-items: center; gap: 14px">
<div style="flex: 1; display: flex; flex-direction: column">
<span style="font-size: 13px; font-weight: 600; color: #4A6572">{{sel.name}}</span>
<span style="font-size: 17px; font-weight: 900">{{price}} تومان</span>
</div>
<a href="M-Card.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 26px; border-radius: 27px; display: flex; align-items: center; gap: 8px">ادامه، کارت پستال
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></a>
</div>

</div>

==========================================
### FILE: 03-کارت پستال و پیام.html
### TITLE: کارت پستال و پیام
### SCRIPT:

class Component extends DCLogic {
  state = { occ: 0, len: 0, anon: false };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const labels = ['همین‌طوری', 'دلم تنگ شده', 'زودتر خوب شی', 'تولدت مبارک'];
    const holders = [
      'مثلاً: همین‌طوری گفتم یه بغل برات بفرستم، چون دوستت دارم…',
      'مثلاً: دلم برات خیلی تنگ شده، زود بیا ببینمت…',
      'مثلاً: زودتر خوب شو، بدون تو هیچ‌چی مزه نداره…',
      'مثلاً: تولدت مبارک عزیزم، امسال بهترین سالِ زندگیته…',
    ];
    const occasions = labels.map((label, i) => ({
      label,
      isOn: i === this.state.occ,
      bg: i === this.state.occ ? '#00ABE7' : '#fff',
      border: i === this.state.occ ? '#04202E' : '#CFE6EF',
      pick: () => this.setState({ occ: i }),
    }));
    const anon = this.state.anon;
    return {
      occasions,
      ph: holders[this.state.occ],
      len: fa(this.state.len),
      onType: (e) => this.setState({ len: (e.target.value || '').length }),
      anon,
      toggleAnon: () => this.setState({ anon: !anon }),
      switchBg: anon ? '#00ABE7' : '#C7DCE5',
      knobStyle: 'position:absolute;top:3px;width:26px;height:26px;border-radius:13px;background:#fff;box-shadow:0 2px 5px rgba(4,32,46,0.28);' + (anon ? 'left:3px' : 'right:3px'),
      showName: !anon,
      giftNo: fa(Number(this.props.nextNo ?? 101)),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1560px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<a href="M-Pick.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<span style="font-size: 14px; font-weight: 700; color: #4A6572">قدم ۲ از ۴</span>
</div>
<div style="display: flex; gap: 6px; padding: 8px 20px 0">
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
</div>

<div style="padding: 22px 20px 4px">
<h1 style="margin: 0; font-size: 32px; line-height: 1.4; font-weight: 900">کارت پستالت رو بنویس</h1>
<p style="margin: 8px 0 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">یه کارت پستال فقط با یه QR همراه جعبه می‌رسه. دوستت اسکنش می‌کنه، رمز رو می‌زنه و پیامت رو می‌بینه.</p>
</div>

<div style="display: flex; gap: 8px; overflow-x: auto; padding: 14px 20px 4px">
<sc-for list="{{occasions}}" as="o" hint-placeholder-count="4">
<button type="button" sc-camel-on-click="{{o.pick}}" aria-pressed="{{o.isOn}}" style="flex: 0 0 auto; height: 44px; padding: 0 18px; border-radius: 22px; font-size: 14.5px; font-weight: 700; cursor: pointer; background: {{o.bg}}; color: #04202E; border: 1.5px solid {{o.border}}">{{o.label}}</button>
</sc-for>
</div>

<div style="margin: 12px 20px 0; background: #fff; border: 1.5px solid #CFE6EF; border-radius: 24px; padding: 14px 16px 12px; display: flex; flex-direction: column; gap: 8px">
<label for="msg" style="font-size: 14px; font-weight: 800">پیامت</label>
<textarea id="msg" rows="5" sc-camel-max-length="400" sc-camel-on-input="{{onType}}" placeholder="{{ph}}" style="border: none; outline: none; resize: none; background: transparent; font-size: 16px; line-height: 1.9; color: #04202E; min-height: 130px; direction: rtl"></textarea>
<div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #4A6572">
<span>متن، عکس یا ویدیو؛ هر چی دلت خواست</span>
<span>{{len}} / ۴۰۰</span>
</div>
</div>

<div style="display: flex; gap: 12px; padding: 12px 20px 0">
<button type="button" style="flex: 1; height: 112px; border-radius: 22px; background: #E3F6FD; border: 2px dashed #00ABE7; color: #04202E; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 700; cursor: pointer">
<svg width="28" height="28" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><circle cx="9" cy="11" r="1.8"></circle><path d="M4 17l5-4 4 3 3-2 4 3"></path></svg>
افزودن عکس</button>
<button type="button" style="flex: 1; height: 112px; border-radius: 22px; background: #FFE9F0; border: 2px dashed #F0426B; color: #04202E; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 700; cursor: pointer">
<svg width="28" height="28" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="3"></rect><path d="M16 11l5-3v8l-5-3"></path></svg>
افزودن ویدیو</button>
</div>

<div style="margin: 18px 20px 0; display: flex; flex-direction: column; gap: 8px">
<label for="pw" style="font-size: 14px; font-weight: 800">رمز کارت</label>
<input id="pw" type="text" placeholder="مثلاً اسم اولین جایی که با هم رفتید" style="height: 54px; box-sizing: border-box; border-radius: 18px; border: 1.5px solid #CFE6EF; background: #fff; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl">
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500; color: #4A6572">فقط کسی که این رمز رو بدونه می‌تونه پیامت رو ببینه. رمز رو بهش بگو یا یه سرنخ بهش بده.</span>
</div>

<div style="margin: 18px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 6px 16px">
<div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; gap: 12px">
<div style="display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">ناشناس بفرست</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">توی جعبه هیچ اسمی نمی‌ذاریم</span>
</div>
<button type="button" role="switch" aria-checked="{{anon}}" aria-label="ارسال ناشناس" sc-camel-on-click="{{toggleAnon}}" style="position: relative; flex: 0 0 auto; width: 54px; height: 32px; border-radius: 16px; border: none; padding: 0; cursor: pointer; background: {{switchBg}}">
<span style="{{knobStyle}}"></span>
</button>
</div>
<sc-if value="{{showName}}" hint-placeholder-val="{{ true }}">
<div style="border-top: 1px solid #E3F0F5; padding: 12px 0 14px; display: flex; flex-direction: column; gap: 8px">
<label for="nm" style="font-size: 14px; font-weight: 800">اسم تو</label>
<input id="nm" type="text" placeholder="اسمت چیه؟" style="height: 50px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl">
</div>
</sc-if>
</div>

<div style="margin: 18px 20px 0; border-radius: 26px; background: #D6F1FB; padding: 18px; display: flex; align-items: center; gap: 16px">
<div style="flex: 0 0 auto; width: 128px; height: 98px; background: #fff; border: 2.5px solid #04202E; border-radius: 12px; transform: rotate(-3deg); display: flex; align-items: center; justify-content: center">
<svg width="72" height="72" sc-camel-view-box="0 0 25 25" aria-hidden="true"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 16px; font-weight: 800">کارت پستالِ تو</span>
<span style="font-size: 13px; line-height: 1.85; font-weight: 500; color: #1F3E4D">روی کارت فقط همین QR هست. شماره‌ی هدیه‌ی تو، <b>{{giftNo}}</b>، روی خود جعبه می‌شینه.</span>
</div>
</div>

<div style="margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 14px 20px 30px; display: flex; align-items: center; gap: 14px">
<a href="M-Extras.dc.html" style="flex: 1; text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center; gap: 8px">ادامه، پنجه و قلب
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></a>
</div>

</div>

==========================================
### FILE: 04-پنجه و قلب.html
### TITLE: پنجه و قلب
### SCRIPT:

class Component extends DCLogic {
  state = { h: 5, p: 3 };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const price = Number(this.props.price ?? 890000);
    const charm = Number(this.props.charm ?? 50000);
    const done = Number(this.props.charityDone ?? 0);
    const target = Math.max(1, Number(this.props.charityTarget ?? 30));
    const { h, p } = this.state;
    const all = [];
    let hi = 0, pi = 0;
    while (hi < h || pi < p) {
      if (hi < h) { all.push('h'); hi++; }
      if (pi < p) { all.push('p'); pi++; }
    }
    const cap = 26;
    const shown = all.slice(0, cap).map((k, i) => ({
      isHeart: k === 'h',
      isPaw: k === 'p',
      tr: 'display:inline-flex;transform:rotate(' + (((i * 37) % 28) - 14) + 'deg)',
    }));
    const doneNow = done + h + p;
    return {
      charm: money(charm),
      hearts: fa(h),
      paws: fa(p),
      heartPlus: () => this.setState({ h: h + 1 }),
      heartMinus: () => this.setState({ h: Math.max(0, h - 1) }),
      pawPlus: () => this.setState({ p: p + 1 }),
      pawMinus: () => this.setState({ p: Math.max(0, p - 1) }),
      stickers: shown,
      hasMore: all.length > cap,
      more: fa(all.length - cap),
      giftNo: fa(Number(this.props.nextNo ?? 101)),
      doneNow: fa(doneNow),
      target: '[هدف]',
      barPct: Math.min(100, Math.round((doneNow / target) * 100)),
      total: money(price + (h + p) * charm),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1360px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<a href="M-Card.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<span style="font-size: 14px; font-weight: 700; color: #4A6572">قدم ۳ از ۴</span>
</div>
<div style="display: flex; gap: 6px; padding: 8px 20px 0">
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #CFE6EF"></div>
</div>

<div style="padding: 22px 20px 4px">
<h1 style="margin: 0; font-size: 32px; line-height: 1.4; font-weight: 900">یه ذره مهربونی اضافه کن</h1>
<p style="margin: 8px 0 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. هر چندتا که دلت خواست.</p>
</div>

<div style="display: flex; flex-direction: column; gap: 12px; padding: 14px 20px 0">

<div style="background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 28px; padding: 16px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 68px; height: 68px; border-radius: 34px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="40" height="40" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 3px">
<span style="font-size: 18px; font-weight: 900">قلب قرمز</span>
<span style="font-size: 13px; font-weight: 500; color: #1F3E4D">برای هدیه به بچه‌های بی‌سرپرست</span>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 14px; font-weight: 700">هر کدوم {{charm}} تومان</span>
<div style="display: flex; align-items: center; gap: 4px; background: #fff; border-radius: 26px; padding: 4px">
<button type="button" aria-label="یکی کم کن" sc-camel-on-click="{{heartMinus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F2FAFD; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"></path></svg></button>
<span style="min-width: 38px; text-align: center; font-size: 20px; font-weight: 900">{{hearts}}</span>
<button type="button" aria-label="یکی زیاد کن" sc-camel-on-click="{{heartPlus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F0426B; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></button>
</div>
</div>
</div>

<div style="background: #E3F6FD; border: 1.5px solid #B5E3F5; border-radius: 28px; padding: 16px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 68px; height: 68px; border-radius: 34px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="38" height="38" sc-camel-view-box="0 0 24 24" fill="#00ABE7" stroke="#04202E" stroke-width="1.4" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 3px">
<span style="font-size: 18px; font-weight: 900">پنجه</span>
<span style="font-size: 13px; font-weight: 500; color: #1F3E4D">برای هدیه به پناهگاه حیوونا</span>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 14px; font-weight: 700">هر کدوم {{charm}} تومان</span>
<div style="display: flex; align-items: center; gap: 4px; background: #fff; border-radius: 26px; padding: 4px">
<button type="button" aria-label="یکی کم کن" sc-camel-on-click="{{pawMinus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F2FAFD; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"></path></svg></button>
<span style="min-width: 38px; text-align: center; font-size: 20px; font-weight: 900">{{paws}}</span>
<button type="button" aria-label="یکی زیاد کن" sc-camel-on-click="{{pawPlus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #00ABE7; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></button>
</div>
</div>
</div>

</div>

<div style="margin: 18px 20px 0">
<div style="font-size: 15px; font-weight: 800; padding-bottom: 10px">روی جعبه‌ت این‌جوری می‌شینه</div>
<div style="position: relative; background: #00ABE7; border: 2.5px solid #04202E; border-radius: 26px; padding: 18px 16px 16px; min-height: 150px; box-sizing: border-box">
<div style="position: absolute; top: -2px; left: 22px; width: 18px; height: 44px; background: #04202E; border-radius: 0 0 6px 6px"></div>
<div style="display: inline-flex; flex-direction: column; align-items: center; background: #fff; border: 2.5px solid #04202E; border-radius: 14px; padding: 6px 14px 4px; transform: rotate(-3deg)">
<span style="font-size: 10.5px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</span>
<span style="font-size: 26px; font-weight: 900; line-height: 1.1">{{giftNo}}</span>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; padding-top: 12px; align-items: center">
<sc-for list="{{stickers}}" as="s" hint-placeholder-count="8">
<span style="{{s.tr}}">
<sc-if value="{{s.isHeart}}" hint-placeholder-val="{{ true }}">
<svg width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.6" stroke-linejoin="round"></path></svg>
</sc-if>
<sc-if value="{{s.isPaw}}" hint-placeholder-val="{{ false }}">
<svg width="34" height="34" sc-camel-view-box="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="#fff"></circle><g fill="#04202E" transform="translate(12 12) scale(.62) translate(-12 -12)"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></g></svg>
</sc-if>
</span>
</sc-for>
<sc-if value="{{hasMore}}" hint-placeholder-val="{{ false }}">
<span style="background: #04202E; color: #fff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 14px">+{{more}}</span>
</sc-if>
</div>
</div>
</div>

<div style="margin: 16px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 16px 18px; display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 15px; font-weight: 800">اولین بسته‌ی خیریه</span>
<span style="font-size: 13px; font-weight: 700; color: #006387">{{doneNow}} از {{target}}</span>
</div>
<div style="height: 12px; border-radius: 6px; background: #E3F0F5; overflow: hidden">
<div style="height: 12px; border-radius: 6px; background: #00ABE7; width: {{barPct}}%"></div>
</div>
<span style="font-size: 12.5px; line-height: 1.85; font-weight: 500; color: #4A6572">وقتی تعداد قلب و پنجه‌ها به هدفمون برسه، هدیه‌ها رو می‌خریم، می‌فرستیم و مدرکش رو تو «دفتر مهربونی» می‌ذاریم.</span>
</div>

<div style="margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 14px 20px 30px; display: flex; align-items: center; gap: 14px">
<div style="flex: 1; display: flex; flex-direction: column">
<span style="font-size: 13px; font-weight: 600; color: #4A6572">جمع (جعبه + قلب و پنجه)</span>
<span style="font-size: 18px; font-weight: 900">{{total}} تومان</span>
</div>
<a href="M-Checkout.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 26px; border-radius: 27px; display: flex; align-items: center; gap: 8px">برو به سبد
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></a>
</div>

</div>

==========================================
### FILE: 05-سبد و پرداخت.html
### TITLE: سبد و پرداخت
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const price = Number(this.props.price ?? 890000);
    const charm = Number(this.props.charm ?? 50000);
    const h = Number(this.props.hearts ?? 5);
    const p = Number(this.props.paws ?? 3);
    const rows = [];
    if (h > 0) rows.push({ isHeart: true, isPaw: false, bg: '#FFE9F0', title: 'قلب قرمز × ' + fa(h), sub: 'برای بچه‌های بی‌سرپرست', amount: money(h * charm) });
    if (p > 0) rows.push({ isHeart: false, isPaw: true, bg: '#E3F6FD', title: 'پنجه × ' + fa(p), sub: 'برای پناهگاه حیوونا', amount: money(p * charm) });
    return {
      giftNo: fa(Number(this.props.nextNo ?? 101)),
      price: money(price),
      rows,
      total: money(price + (h + p) * charm),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1700px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<a href="M-Extras.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<span style="font-size: 14px; font-weight: 700; color: #4A6572">قدم ۴ از ۴</span>
</div>
<div style="display: flex; gap: 6px; padding: 8px 20px 0">
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
<div style="flex: 1; height: 5px; border-radius: 3px; background: #00ABE7"></div>
</div>

<div style="padding: 22px 20px 4px">
<h1 style="margin: 0; font-size: 32px; line-height: 1.4; font-weight: 900">سبد و پرداخت</h1>
</div>

<div style="margin: 12px 20px 0; position: relative; background: #00ABE7; border-radius: 26px; display: flex; align-items: stretch; overflow: hidden">
<div style="flex: 0 0 118px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 18px 0">
<span style="font-size: 12px; font-weight: 700">هدیه‌ی شماره</span>
<span style="font-size: 44px; font-weight: 900; line-height: 1.15">{{giftNo}}</span>
</div>
<div style="width: 0; margin: 14px 0; border-right: 2.5px dashed #04202E"></div>
<div style="flex: 1; padding: 18px 16px; display: flex; flex-direction: column; justify-content: center; gap: 4px">
<span style="font-size: 16px; font-weight: 900">این شماره مال هدیه‌ی توئه</span>
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500">روی جعبه و کارت پستال می‌شینه و اسمش تو دفتر ما ثبت می‌شه.</span>
</div>
<div style="position: absolute; top: -12px; right: 106px; width: 24px; height: 24px; border-radius: 12px; background: #F2FAFD"></div>
<div style="position: absolute; bottom: -12px; right: 106px; width: 24px; height: 24px; border-radius: 12px; background: #F2FAFD"></div>
</div>

<div style="margin: 16px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 8px 16px">
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<div style="flex: 0 0 auto; width: 64px; height: 64px; border-radius: 18px; background: #FFE8D1; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="bear" size="54" hint-size="54px,54px"></dc-import>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">کِرِمی، دوست پشمالو</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">جعبه‌ی کادویی + کارت پستال QR</span>
</div>
<span style="font-size: 14px; font-weight: 800">{{price}}</span>
</div>
<sc-for list="{{rows}}" as="r" hint-placeholder-count="2">
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<div style="flex: 0 0 auto; width: 40px; height: 40px; border-radius: 20px; background: {{r.bg}}; display: flex; align-items: center; justify-content: center">
<sc-if value="{{r.isHeart}}" hint-placeholder-val="{{ true }}">
<svg width="22" height="22" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round"></path></svg>
</sc-if>
<sc-if value="{{r.isPaw}}" hint-placeholder-val="{{ false }}">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="#00ABE7" stroke="#04202E" stroke-width="1.4" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</sc-if>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">{{r.title}}</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">{{r.sub}}</span>
</div>
<span style="font-size: 14px; font-weight: 800">{{r.amount}}</span>
</div>
</sc-for>
<div style="display: flex; justify-content: space-between; padding: 12px 0 6px; font-size: 14px; font-weight: 600; color: #4A6572">
<span>هزینه‌ی ارسال</span><span>بعد از ثبت آدرس حساب می‌شه</span>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0 12px; font-size: 17px; font-weight: 900">
<span>جمع کل</span><span>{{total}} تومان</span>
</div>
</div>

<div style="padding: 22px 20px 8px; font-size: 18px; font-weight: 800">گیرنده‌ی هدیه</div>
<div style="margin: 0 20px; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 4px 16px">
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<label for="rn" style="font-size: 12.5px; font-weight: 700; color: #4A6572">اسم گیرنده</label>
<input id="rn" type="text" placeholder="اسم دوستت" style="border: none; outline: none; background: transparent; font-size: 16px; color: #04202E; height: 30px; direction: rtl">
</div>
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<label for="rp" style="font-size: 12.5px; font-weight: 700; color: #4A6572">شماره‌ی موبایل گیرنده</label>
<input id="rp" type="tel" inputmode="numeric" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" style="border: none; outline: none; background: transparent; font-size: 16px; color: #04202E; height: 30px; direction: rtl">
</div>
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<label for="rc" style="font-size: 12.5px; font-weight: 700; color: #4A6572">استان و شهر</label>
<input id="rc" type="text" placeholder="مثلاً تهران، تهران" style="border: none; outline: none; background: transparent; font-size: 16px; color: #04202E; height: 30px; direction: rtl">
</div>
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<label for="ra" style="font-size: 12.5px; font-weight: 700; color: #4A6572">آدرس کامل</label>
<textarea id="ra" rows="2" placeholder="خیابان، کوچه، پلاک، واحد" style="border: none; outline: none; resize: none; background: transparent; font-size: 16px; line-height: 1.8; color: #04202E; direction: rtl"></textarea>
</div>
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 0">
<label for="rz" style="font-size: 12.5px; font-weight: 700; color: #4A6572">کدپستی</label>
<input id="rz" type="text" inputmode="numeric" placeholder="کدپستی ده رقمی" style="border: none; outline: none; background: transparent; font-size: 16px; color: #04202E; height: 30px; direction: rtl">
</div>
</div>

<div style="margin: 14px 20px 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 6px 6px 6px 16px; display: flex; align-items: center; gap: 10px">
<label for="cp" style="position: absolute; left: -9999px">کد تخفیف</label>
<input id="cp" type="text" placeholder="کد تخفیف داری؟" style="flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #04202E; height: 44px; direction: rtl">
<button type="button" style="height: 44px; padding: 0 20px; border-radius: 16px; border: none; background: #D6F1FB; color: #04202E; font-size: 14.5px; font-weight: 800; cursor: pointer">اعمال</button>
</div>

<div style="padding: 22px 20px 8px; font-size: 18px; font-weight: 800">روش پرداخت</div>
<div style="margin: 0 20px; background: #fff; border: 2px solid #00ABE7; border-radius: 22px; padding: 14px 16px; display: flex; align-items: center; gap: 12px">
<span style="flex: 0 0 auto; width: 26px; height: 26px; border-radius: 13px; background: #00ABE7; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="14" height="14" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>
</span>
<div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">پرداخت آنلاین</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">با همه‌ی کارت‌های عضو شتاب، از درگاه امن بانکی</span>
</div>
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3"></rect><path d="M3 10.5h18M7 15h4"></path></svg>
</div>

<div style="padding: 14px 24px 0; font-size: 12.5px; line-height: 1.9; font-weight: 500; color: #4A6572; text-align: center">با پرداخت، قوانین و شرایط پیشتم رو قبول می‌کنی. رسید قلب‌ها و پنجه‌ها بعد از ارسال هدیه‌ها تو دفتر مهربونی ثبت می‌شه.</div>

<div style="margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 14px 20px 30px; display: flex; align-items: center; gap: 14px">
<div style="display: flex; flex-direction: column">
<span style="font-size: 13px; font-weight: 600; color: #4A6572">جمع کل</span>
<span style="font-size: 18px; font-weight: 900">{{total}} تومان</span>
</div>
<a href="M-Success.dc.html" style="flex: 1; text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center; gap: 8px">پرداخت و فرستادن
<svg width="20" height="20" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#04202E"></path></svg></a>
</div>

</div>

==========================================
### FILE: 06-قفل کارت پستال.html
### TITLE: قفل کارت پستال
### SCRIPT:

class Component extends DCLogic {
  state = { show: false };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    return {
      giftNo: fa(Number(this.props.nextNo ?? 101)),
      ptype: this.state.show ? 'text' : 'password',
      toggle: () => this.setState({ show: !this.state.show }),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 844px; box-sizing: border-box; background: #00ABE7; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden; position: relative">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 22px 24px 0">
<dc-import name="Logo" size="34" hint-size="120px,34px"></dc-import>
<div style="background: #fff; border: 2.5px solid #04202E; border-radius: 14px; padding: 5px 12px 3px; text-align: center; transform: rotate(3deg)">
<div style="font-size: 10px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 22px; font-weight: 900; line-height: 1.1">{{giftNo}}</div>
</div>
</div>

<div style="position: relative; width: 290px; height: 290px; margin: 26px auto 0; flex: 0 0 auto">
<div style="position: absolute; inset: 0; border-radius: 145px; background: #66CDF1"></div>
<div style="position: absolute; left: 35px; top: 40px">
<dc-import name="Plush" kind="bunny" size="220" hint-size="220px,220px"></dc-import>
</div>
<svg style="position: absolute; top: 18px; right: 28px" width="30" height="30" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round" transform="rotate(12)"></path></svg>
<svg style="position: absolute; top: 80px; left: 8px" width="20" height="20" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round" transform="rotate(-14)"></path></svg>
<div style="position: absolute; bottom: 12px; right: 18px; width: 70px; height: 70px; border-radius: 35px; background: #04202E; border: 4px solid #fff; display: flex; align-items: center; justify-content: center">
<svg width="30" height="30" sc-camel-view-box="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>
</div>
</div>

<div style="padding: 24px 28px 0; text-align: center">
<h1 style="margin: 0; font-size: 30px; line-height: 1.5; font-weight: 900">یکی برات یه چیزی فرستاده</h1>
<p style="margin: 8px 0 0; font-size: 15px; line-height: 1.9; font-weight: 500">رمزی که فرستنده بهت داده رو بزن تا پیامت باز بشه.</p>
</div>

<div style="padding: 20px 24px 0; display: flex; flex-direction: column; gap: 12px">
<div style="position: relative">
<label for="gp" style="position: absolute; left: -9999px">رمز کارت</label>
<input id="gp" type="{{ptype}}" placeholder="رمز کارت" style="width: 100%; box-sizing: border-box; height: 60px; border-radius: 22px; border: 3px solid #04202E; background: #fff; padding: 0 20px 0 56px; font-size: 18px; font-weight: 600; color: #04202E; outline: none; direction: rtl">
<button type="button" aria-label="نمایش یا پنهان کردن رمز" sc-camel-on-click="{{toggle}}" style="position: absolute; left: 8px; top: 8px; width: 44px; height: 44px; border-radius: 16px; border: none; background: #E3F6FD; cursor: pointer; display: flex; align-items: center; justify-content: center">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
</button>
</div>
<a href="M-Gift-Open.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; height: 58px; border-radius: 29px; display: flex; align-items: center; justify-content: center; gap: 8px">باز کن
<svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 7.4-2"></path></svg></a>
<div style="text-align: center; font-size: 14px; font-weight: 700">رمز رو نمی‌دونی؟ از کسی که فرستاده بپرس.</div>
</div>

<div style="margin-top: auto; padding: 0 0 28px; text-align: center; font-size: 12.5px; font-weight: 700">پیشتم · یه بغل، تو یه جعبه</div>

</div>

==========================================
### FILE: 07-پیام تو.html
### TITLE: پیام تو
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    return {
      giftNo: fa(Number(this.props.nextNo ?? 101)),
      sender: this.props.sender ?? 'یه دوست ناشناس',
      hearts: fa(Number(this.props.hearts ?? 5)),
      paws: fa(Number(this.props.paws ?? 3)),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1240px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="position: relative; background: #00ABE7; border-radius: 0 0 40px 40px; padding: 20px 24px 0; height: 340px; box-sizing: border-box; overflow: hidden; flex: 0 0 auto">
<div style="position: absolute; left: -50px; bottom: -70px; width: 260px; height: 260px; border-radius: 130px; background: #66CDF1"></div>
<span style="position: absolute; top: 120px; left: 40px; width: 12px; height: 12px; border-radius: 6px; background: #fff"></span>
<span style="position: absolute; top: 70px; left: 120px; width: 16px; height: 6px; border-radius: 3px; background: #04202E; transform: rotate(35deg)"></span>
<span style="position: absolute; top: 150px; left: 190px; width: 14px; height: 14px; border-radius: 7px; background: #FFE08A; border: 2px solid #04202E; box-sizing: border-box"></span>
<span style="position: absolute; top: 60px; right: 90px; width: 18px; height: 6px; border-radius: 3px; background: #fff; transform: rotate(-30deg)"></span>
<span style="position: absolute; top: 200px; right: 40px; width: 12px; height: 12px; border-radius: 6px; background: #FFB3C6; border: 2px solid #04202E; box-sizing: border-box"></span>
<svg style="position: absolute; top: 96px; right: 150px" width="26" height="26" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round" transform="rotate(-14)"></path></svg>
<div style="display: flex; align-items: center; justify-content: space-between; position: relative">
<a href="Main.dc.html" aria-label="بستن" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
</a>
<div style="background: #fff; border: 2.5px solid #04202E; border-radius: 14px; padding: 5px 12px 3px; text-align: center; transform: rotate(3deg)">
<div style="font-size: 10px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 22px; font-weight: 900; line-height: 1.1">{{giftNo}}</div>
</div>
</div>
<div style="position: relative; padding-top: 22px; display: flex; flex-direction: column; gap: 6px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 12.5px; font-weight: 700; padding: 6px 14px; border-radius: 14px">از طرف {{sender}}</span>
<h1 style="margin: 0; font-size: 34px; line-height: 1.4; font-weight: 900">یه بغل برات رسید</h1>
</div>
<div style="position: absolute; left: 14px; bottom: -8px">
<dc-import name="Plush" kind="panda" size="168" hint-size="168px,168px"></dc-import>
</div>
</div>

<div style="margin: -26px 20px 0; position: relative; background: #fff; border: 1px solid #DDEEF5; border-radius: 30px; padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 8px 24px rgba(4,32,46,0.07)">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 14px; font-weight: 800; color: #006387">پیام برای تو</span>
<span style="background: #D6F1FB; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 12px">دلم تنگ شده</span>
</div>
<p style="margin: 0; font-size: 17px; line-height: 2.1; font-weight: 500">عزیزم، دلم برات خیلی تنگ شده بود. گفتم تا وقتی دوباره ببینمت، این دوست پشمالو جام رو پیشت بگیره. هر وقت دلت گرفت، بغلش کن و بدون که منم همین‌جام.</p>
</div>

<div style="display: flex; gap: 12px; padding: 16px 20px 0">
<div style="flex: 1; background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 10px 10px 8px; transform: rotate(-2deg)">
<svg sc-camel-view-box="0 0 140 112" width="100%" role="img" aria-label="عکس فرستنده" style="display: block; border-radius: 12px; background: #BFE9F8">
<circle cx="104" cy="30" r="15" fill="#FFE08A"></circle>
<path d="M0 86C26 56 50 56 76 80S120 92 140 76V112H0z" fill="#FFB3C6"></path>
<path d="M0 98C30 78 60 82 90 96 110 104 126 100 140 94V112H0z" fill="#00ABE7"></path>
<path transform="translate(40 52) scale(.9)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round"></path>
</svg>
<div style="font-size: 12.5px; font-weight: 700; text-align: center; padding-top: 8px">عکس فرستنده</div>
</div>
<div style="flex: 1; display: flex; flex-direction: column">
<button type="button" aria-label="پخش ویدیو" style="position: relative; flex: 1; border: none; cursor: pointer; border-radius: 22px; background: #04202E; padding: 0; overflow: hidden; min-height: 150px">
<span style="position: absolute; left: -20px; bottom: -30px; width: 120px; height: 120px; border-radius: 60px; background: #0A3B52"></span>
<span style="position: absolute; top: 50%; left: 50%; margin: -28px 0 0 -28px; width: 56px; height: 56px; border-radius: 28px; background: #00ABE7; display: flex; align-items: center; justify-content: center">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="#04202E" aria-hidden="true"><path d="M8 5l11 7-11 7z"></path></svg>
</span>
<span style="position: absolute; bottom: 10px; right: 12px; color: #fff; font-size: 12.5px; font-weight: 700">ویدیوی فرستنده</span>
</button>
</div>
</div>

<div style="margin: 16px 20px 0; background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 26px; padding: 16px 18px; display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; display: flex">
<svg width="40" height="40" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
</div>
<div style="font-size: 14px; line-height: 1.9; font-weight: 600; color: #1F3E4D">فرستنده‌ت با <b style="color: #04202E">{{hearts}} قلب</b> و <b style="color: #04202E">{{paws}} پنجه</b> به بچه‌های بی‌سرپرست و حیوونا هدیه داده. این هدیه، مهربونی رو دو برابر کرد.</div>
</div>

<div style="display: flex; flex-direction: column; gap: 10px; padding: 18px 20px 0">
<a href="Main.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 56px; border-radius: 28px; display: flex; align-items: center; justify-content: center; gap: 8px">تو هم برای یکی بفرست
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></a>
<button type="button" style="height: 52px; border-radius: 26px; border: 2px solid #04202E; background: transparent; color: #04202E; font-size: 15px; font-weight: 800; cursor: pointer">یه قلب برای فرستنده بفرست</button>
</div>

<div style="margin-top: auto; padding: 18px 0 28px; text-align: center; font-size: 12.5px; font-weight: 600; color: #4A6572">پیشتم · یه بغل، تو یه جعبه</div>

</div>

==========================================
### FILE: 08-دفتر مهربونی.html
### TITLE: دفتر مهربونی
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const done = Number(this.props.charityDone ?? 0);
    const target = Math.max(1, Number(this.props.charityTarget ?? 30));
    return {
      done: fa(done),
      target: '[هدف]',
      pct: Math.min(100, Math.round((done / target) * 100)),
      steps: [
        { n: '۱', bg: '#FFE9F0', text: 'پولِ قلب‌ها و پنجه‌ها جدا از فروش جعبه‌ها نگه داشته می‌شه.' },
        { n: '۲', bg: '#D6F1FB', text: 'با پول جمع‌شده هدیه می‌خریم و خودمون به خیریه می‌رسونیم.' },
        { n: '۳', bg: '#FFF3C9', text: 'رسید، عکس و تأییدیه‌ی تحویل رو همین‌جا برات می‌ذاریم.' },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1300px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<div style="display: flex; gap: 6px">
<svg width="26" height="26" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="#00ABE7" stroke="#04202E" stroke-width="1.4" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</div>
</div>

<div style="padding: 16px 20px 4px">
<h1 style="margin: 0; font-size: 34px; line-height: 1.4; font-weight: 900">دفتر مهربونی</h1>
<p style="margin: 8px 0 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی.</p>
</div>

<div style="margin: 14px 20px 0; background: #04202E; color: #fff; border-radius: 30px; padding: 22px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: baseline; justify-content: space-between">
<span style="font-size: 14px; font-weight: 700; color: #BFE9F8">اولین بسته‌ی خیریه</span>
<span style="font-size: 12.5px; font-weight: 600; color: #BFE9F8">در حال جمع شدن</span>
</div>
<div style="display: flex; align-items: baseline; gap: 8px">
<span style="font-size: 52px; line-height: 1.1; font-weight: 900; color: #00ABE7">{{done}}</span>
<span style="font-size: 18px; font-weight: 700">از {{target}} هدیه</span>
</div>
<div style="height: 14px; border-radius: 7px; background: #0E3C52; overflow: hidden">
<div style="height: 14px; border-radius: 7px; background: #00ABE7; width: {{pct}}%"></div>
</div>
<span style="font-size: 13px; line-height: 1.9; font-weight: 500; color: #D3EEF9">وقتی به {{target}} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم. بعدش رسید و عکس تحویلش رو همین پایین می‌بینی.</span>
<a href="M-Extras.dc.html" style="text-decoration: none; align-self: flex-start; background: #00ABE7; color: #04202E; font-size: 14.5px; font-weight: 800; height: 44px; padding: 0 20px; border-radius: 22px; display: flex; align-items: center; gap: 6px">تو هم قلب اضافه کن</a>
</div>

<div style="padding: 24px 20px 10px; font-size: 20px; font-weight: 800">مدارک ارسال</div>
<div style="margin: 0 20px; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 16px; display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 56px; height: 64px; border-radius: 14px; background: #D6F1FB; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v4h4M10 12h5M10 16h5"></path></svg>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 4px">
<span style="font-size: 15.5px; font-weight: 800">ارسال هدیه به [نام خیریه]</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">[تاریخ] · [تعداد] هدیه</span>
<span style="align-self: flex-start; background: #D6F1FB; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 10px; color: #04202E">رسید و عکس تحویل</span>
</div>
<svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#5B7482" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg>
</div>
<div style="margin: 10px 20px 0; border: 2px dashed #99D6EE; border-radius: 26px; padding: 18px 16px; display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 56px; height: 56px; border-radius: 28px; background: #E3F6FD; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#006387" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z"></path></svg>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 3px">
<span style="font-size: 15px; font-weight: 800">ارسال بعدی</span>
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500; color: #4A6572">وقتی بسته‌ی جاری کامل شد، اینجا مدرکش اضافه می‌شه.</span>
</div>
</div>

<div style="padding: 26px 20px 10px; font-size: 20px; font-weight: 800">چطوری شفاف می‌مونیم؟</div>
<div style="margin: 0 20px; display: flex; flex-direction: column; gap: 10px">
<sc-for list="{{steps}}" as="s" hint-placeholder-count="3">
<div style="display: flex; align-items: center; gap: 14px; background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 14px 16px">
<div style="flex: 0 0 auto; width: 38px; height: 38px; border-radius: 19px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900">{{s.n}}</div>
<span style="font-size: 14px; line-height: 1.85; font-weight: 600; color: #1F3E4D">{{s.text}}</span>
</div>
</sc-for>
</div>

<nav aria-label="ناوبری اصلی" style="margin-top: auto; background: rgba(255,255,255,0.94); border-top: 1px solid #D3E8F0; padding: 8px 12px 26px; display: flex; justify-content: space-between; align-items: flex-end">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z"></path></svg>دوست‌ها</a>
<a href="M-Pick.dc.html" aria-label="ساخت هدیه" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #04202E; font-size: 11px; font-weight: 800; margin-top: -30px">
<span style="width: 58px; height: 58px; border-radius: 29px; background: #00ABE7; border: 4px solid #fff; box-shadow: 0 6px 16px rgba(0,171,231,0.35); display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span>بساز</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #006387; font-size: 11px; font-weight: 800">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="#00ABE7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 09-دوست پشمالو.html
### TITLE: دوست پشمالو
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const kind = this.props.kind ?? 'bear';
    const px = parseInt(this.props.size ?? 200, 10) || 200;
    const names = { bear: 'کِرِمی، خرس', bunny: 'لپ‌قندی، خرگوش', cat: 'میشی، گربه', panda: 'بامبو، پاندا', sheep: 'ابری، گوسفند', duck: 'قات‌قات، اردک' };
    return {
      px,
      label: names[kind] || names.bear,
      isBear: kind === 'bear',
      isBunny: kind === 'bunny',
      isCat: kind === 'cat',
      isPanda: kind === 'panda',
      isSheep: kind === 'sheep',
      isDuck: kind === 'duck',
    };
  }
}

### BODY:

<div style="width: {{px}}px; height: {{px}}px">
<sc-if value="{{isBear}}" hint-placeholder-val="{{ true }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<circle cx="56" cy="50" r="21" fill="#F4C9A1"></circle><circle cx="56" cy="50" r="10" fill="#FF9DB8" stroke="none"></circle>
<circle cx="144" cy="50" r="21" fill="#F4C9A1"></circle><circle cx="144" cy="50" r="10" fill="#FF9DB8" stroke="none"></circle>
<ellipse cx="72" cy="176" rx="17" ry="12" fill="#F4C9A1"></ellipse><ellipse cx="128" cy="176" rx="17" ry="12" fill="#F4C9A1"></ellipse>
<ellipse cx="100" cy="140" rx="48" ry="44" fill="#F4C9A1"></ellipse>
<ellipse cx="100" cy="148" rx="29" ry="28" fill="#FFE8D1" stroke="none"></ellipse>
<path transform="translate(100 150)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3"></path>
<ellipse cx="54" cy="136" rx="13" ry="18" fill="#F4C9A1" transform="rotate(20 54 136)"></ellipse>
<ellipse cx="146" cy="136" rx="13" ry="18" fill="#F4C9A1" transform="rotate(-20 146 136)"></ellipse>
<ellipse cx="100" cy="84" rx="56" ry="46" fill="#F4C9A1"></ellipse>
<ellipse cx="100" cy="98" rx="21" ry="16" fill="#FFE8D1"></ellipse>
<ellipse cx="100" cy="91" rx="7" ry="5" fill="#04202E" stroke="none"></ellipse>
<path d="M100 96v5M92 104q8 6 16 0" fill="none"></path>
</g>
<circle cx="76" cy="80" r="5.5" fill="#04202E"></circle><circle cx="124" cy="80" r="5.5" fill="#04202E"></circle>
<circle cx="78" cy="78" r="1.8" fill="#fff"></circle><circle cx="126" cy="78" r="1.8" fill="#fff"></circle>
<circle cx="64" cy="98" r="8" fill="#FF9DB8" opacity=".75"></circle><circle cx="136" cy="98" r="8" fill="#FF9DB8" opacity=".75"></circle>
</svg>
</sc-if>
<sc-if value="{{isBunny}}" hint-placeholder-val="{{ false }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="52" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="72" cy="38" rx="15" ry="36" fill="#FDF1EE" transform="rotate(-8 72 38)"></ellipse>
<ellipse cx="72" cy="40" rx="7" ry="24" fill="#FFB3C6" stroke="none" transform="rotate(-8 72 40)"></ellipse>
<ellipse cx="128" cy="38" rx="15" ry="36" fill="#FDF1EE" transform="rotate(8 128 38)"></ellipse>
<ellipse cx="128" cy="40" rx="7" ry="24" fill="#FFB3C6" stroke="none" transform="rotate(8 128 40)"></ellipse>
<ellipse cx="74" cy="178" rx="17" ry="11" fill="#FDF1EE"></ellipse><ellipse cx="126" cy="178" rx="17" ry="11" fill="#FDF1EE"></ellipse>
<ellipse cx="100" cy="150" rx="42" ry="36" fill="#FDF1EE"></ellipse>
<path transform="translate(100 152) scale(.9)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3.4"></path>
<ellipse cx="60" cy="148" rx="11" ry="17" fill="#FDF1EE" transform="rotate(18 60 148)"></ellipse>
<ellipse cx="140" cy="148" rx="11" ry="17" fill="#FDF1EE" transform="rotate(-18 140 148)"></ellipse>
<ellipse cx="100" cy="100" rx="54" ry="42" fill="#FDF1EE"></ellipse>
<path d="M94 99h12l-6 6z" fill="#FF8FB1"></path>
<path d="M100 105v4M92 112q8 5 16 0" fill="none"></path>
</g>
<circle cx="76" cy="92" r="5.5" fill="#04202E"></circle><circle cx="124" cy="92" r="5.5" fill="#04202E"></circle>
<circle cx="78" cy="90" r="1.8" fill="#fff"></circle><circle cx="126" cy="90" r="1.8" fill="#fff"></circle>
<circle cx="63" cy="108" r="8" fill="#FF9DB8" opacity=".75"></circle><circle cx="137" cy="108" r="8" fill="#FF9DB8" opacity=".75"></circle>
</svg>
</sc-if>
<sc-if value="{{isCat}}" hint-placeholder-val="{{ false }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<path d="M146 156c30-4 36-34 16-46" fill="none" stroke-width="17"></path>
<path d="M146 156c30-4 36-34 16-46" fill="none" stroke="#D9CCF5" stroke-width="10"></path>
<path d="M50 68L54 24L90 46Z" fill="#D9CCF5"></path><path d="M58 56L60 36L76 47Z" fill="#FFB3C6" stroke="none"></path>
<path d="M150 68L146 24L110 46Z" fill="#D9CCF5"></path><path d="M142 56L140 36L124 47Z" fill="#FFB3C6" stroke="none"></path>
<ellipse cx="74" cy="178" rx="17" ry="11" fill="#D9CCF5"></ellipse><ellipse cx="126" cy="178" rx="17" ry="11" fill="#D9CCF5"></ellipse>
<ellipse cx="100" cy="142" rx="44" ry="40" fill="#D9CCF5"></ellipse>
<ellipse cx="100" cy="150" rx="26" ry="26" fill="#F1EBFC" stroke="none"></ellipse>
<path transform="translate(100 152)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3"></path>
<ellipse cx="58" cy="140" rx="12" ry="17" fill="#D9CCF5" transform="rotate(18 58 140)"></ellipse>
<ellipse cx="142" cy="140" rx="12" ry="17" fill="#D9CCF5" transform="rotate(-18 142 140)"></ellipse>
<ellipse cx="100" cy="90" rx="56" ry="44" fill="#D9CCF5"></ellipse>
<path d="M100 48v12M84 50l3 11M116 50l-3 11" fill="none"></path>
<path d="M95 96h10l-5 6z" fill="#FF8FB1"></path>
<path d="M100 102q-8 9-16 4M100 102q8 9 16 4" fill="none"></path>
<path d="M56 100h-16M57 108l-15 5M144 100h16M143 108l15 5" fill="none" stroke-width="2.5"></path>
</g>
<circle cx="76" cy="86" r="5.5" fill="#04202E"></circle><circle cx="124" cy="86" r="5.5" fill="#04202E"></circle>
<circle cx="78" cy="84" r="1.8" fill="#fff"></circle><circle cx="126" cy="84" r="1.8" fill="#fff"></circle>
<circle cx="66" cy="102" r="7.5" fill="#FF9DB8" opacity=".75"></circle><circle cx="134" cy="102" r="7.5" fill="#FF9DB8" opacity=".75"></circle>
</svg>
</sc-if>
<sc-if value="{{isPanda}}" hint-placeholder-val="{{ false }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<circle cx="54" cy="50" r="21" fill="#04202E"></circle><circle cx="146" cy="50" r="21" fill="#04202E"></circle>
<ellipse cx="72" cy="176" rx="17" ry="12" fill="#04202E"></ellipse><ellipse cx="128" cy="176" rx="17" ry="12" fill="#04202E"></ellipse>
<ellipse cx="100" cy="142" rx="48" ry="44" fill="#FFFFFF"></ellipse>
<path transform="translate(100 150)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3"></path>
<ellipse cx="54" cy="138" rx="13" ry="18" fill="#04202E" transform="rotate(20 54 138)"></ellipse>
<ellipse cx="146" cy="138" rx="13" ry="18" fill="#04202E" transform="rotate(-20 146 138)"></ellipse>
<ellipse cx="100" cy="86" rx="56" ry="46" fill="#FFFFFF"></ellipse>
<ellipse cx="76" cy="84" rx="13" ry="16" fill="#04202E" transform="rotate(-20 76 84)"></ellipse>
<ellipse cx="124" cy="84" rx="13" ry="16" fill="#04202E" transform="rotate(20 124 84)"></ellipse>
<ellipse cx="100" cy="99" rx="7" ry="5" fill="#04202E"></ellipse>
<path d="M100 104q-6 8-12 3M100 104q6 8 12 3" fill="none"></path>
</g>
<circle cx="77" cy="83" r="5" fill="#fff"></circle><circle cx="123" cy="83" r="5" fill="#fff"></circle>
<circle cx="78" cy="84" r="2.4" fill="#04202E"></circle><circle cx="122" cy="84" r="2.4" fill="#04202E"></circle>
<circle cx="62" cy="106" r="8" fill="#FF9DB8" opacity=".8"></circle><circle cx="138" cy="106" r="8" fill="#FF9DB8" opacity=".8"></circle>
</svg>
</sc-if>
<sc-if value="{{isSheep}}" hint-placeholder-val="{{ false }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<rect x="70" y="164" width="14" height="22" rx="7" fill="#04202E"></rect><rect x="116" y="164" width="14" height="22" rx="7" fill="#04202E"></rect>
<circle cx="62" cy="138" r="26" fill="#fff"></circle><circle cx="138" cy="138" r="26" fill="#fff"></circle><circle cx="100" cy="150" r="30" fill="#fff"></circle><circle cx="100" cy="126" r="32" fill="#fff"></circle>
</g>
<g fill="#fff"><circle cx="62" cy="138" r="24"></circle><circle cx="138" cy="138" r="24"></circle><circle cx="100" cy="150" r="28"></circle><circle cx="100" cy="126" r="30"></circle></g>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<path transform="translate(100 152)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3"></path>
<ellipse cx="54" cy="92" rx="17" ry="9" fill="#F4D3BF" transform="rotate(-25 54 92)"></ellipse>
<ellipse cx="146" cy="92" rx="17" ry="9" fill="#F4D3BF" transform="rotate(25 146 92)"></ellipse>
<ellipse cx="100" cy="92" rx="40" ry="36" fill="#F4D3BF"></ellipse>
<circle cx="78" cy="58" r="17" fill="#fff"></circle><circle cx="100" cy="52" r="18" fill="#fff"></circle><circle cx="122" cy="58" r="17" fill="#fff"></circle>
</g>
<g fill="#fff"><circle cx="78" cy="58" r="15"></circle><circle cx="100" cy="52" r="16"></circle><circle cx="122" cy="58" r="15"></circle></g>
<path d="M95 100h10l-5 5zM100 105v3M92 111q8 5 16 0" fill="#04202E" stroke="#04202E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>
<circle cx="82" cy="90" r="5" fill="#04202E"></circle><circle cx="118" cy="90" r="5" fill="#04202E"></circle>
<circle cx="84" cy="88" r="1.7" fill="#fff"></circle><circle cx="120" cy="88" r="1.7" fill="#fff"></circle>
<circle cx="72" cy="102" r="7" fill="#FF9DB8" opacity=".8"></circle><circle cx="128" cy="102" r="7" fill="#FF9DB8" opacity=".8"></circle>
</svg>
</sc-if>
<sc-if value="{{isDuck}}" hint-placeholder-val="{{ false }}">
<svg sc-camel-view-box="0 0 200 200" width="{{px}}" height="{{px}}" role="img" aria-label="{{label}}">
<ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08"></ellipse>
<g stroke="#04202E" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="74" cy="182" rx="17" ry="7" fill="#FF9F5A"></ellipse><ellipse cx="126" cy="182" rx="17" ry="7" fill="#FF9F5A"></ellipse>
<ellipse cx="100" cy="142" rx="50" ry="42" fill="#FFE08A"></ellipse>
<ellipse cx="100" cy="150" rx="28" ry="26" fill="#FFF0BE" stroke="none"></ellipse>
<path transform="translate(100 152)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#00ABE7" stroke-width="3"></path>
<ellipse cx="52" cy="140" rx="12" ry="19" fill="#FFE08A" transform="rotate(22 52 140)"></ellipse>
<ellipse cx="148" cy="140" rx="12" ry="19" fill="#FFE08A" transform="rotate(-22 148 140)"></ellipse>
<circle cx="100" cy="84" r="48" fill="#FFE08A"></circle>
<path d="M94 38q4-16 14-8" fill="none"></path>
<ellipse cx="100" cy="98" rx="21" ry="12" fill="#FF9F5A"></ellipse>
<path d="M82 98h36" fill="none" stroke-width="2.5"></path>
</g>
<circle cx="76" cy="80" r="5.5" fill="#04202E"></circle><circle cx="124" cy="80" r="5.5" fill="#04202E"></circle>
<circle cx="78" cy="78" r="1.8" fill="#fff"></circle><circle cx="126" cy="78" r="1.8" fill="#fff"></circle>
<circle cx="62" cy="98" r="8" fill="#FF9DB8" opacity=".75"></circle><circle cx="138" cy="98" r="8" fill="#FF9DB8" opacity=".75"></circle>
</svg>
</sc-if>
</div>

==========================================
### FILE: 10-لوگوی پیشتم.html
### TITLE: لوگوی پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const size = parseInt(this.props.size ?? 48, 10) || 48;
    const sn = this.props.showName;
    return {
      size,
      wordSize: Math.round(size * 0.62),
      showName: !(sn === false || sn === 'false'),
    };
  }
}

### BODY:

<div style="display: flex; align-items: center; gap: 10px; direction: rtl; font-family: 'Vazirmatn', system-ui, sans-serif">
<svg sc-camel-view-box="0 0 64 64" width="{{size}}" height="{{size}}" role="img" aria-label="لوگوی پیشتم">
<rect x="2" y="2" width="60" height="60" rx="18" fill="#00ABE7"></rect>
<path d="M32 51C17 41 10 33 10 26a11 11 0 0 1 22-3 11 11 0 0 1 22 3c0 7-7 15-22 25z" fill="#FFFFFF" stroke="#04202E" stroke-width="3.2" stroke-linejoin="round"></path>
<ellipse cx="24.5" cy="20.5" rx="8.5" ry="4.8" transform="rotate(-24 24.5 20.5)" fill="#00ABE7" stroke="#04202E" stroke-width="2.6"></ellipse>
<ellipse cx="39.5" cy="20.5" rx="8.5" ry="4.8" transform="rotate(24 39.5 20.5)" fill="#00ABE7" stroke="#04202E" stroke-width="2.6"></ellipse>
<circle cx="32" cy="23" r="3.4" fill="#04202E"></circle>
</svg>
<sc-if value="{{showName}}" hint-placeholder-val="{{ true }}">
<span style="font-size: {{wordSize}}px; font-weight: 900; color: #04202E; line-height: 1">پیشتم</span>
</sc-if>
</div>

==========================================
### FILE: 11-هویت چاپی پیشتم.html
### TITLE: هویت چاپی پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const s = Number(this.props.startNo ?? 101);
    return {
      n1: fa(s),
      n2: fa(s + 1),
      family: [
        { kind: 'bear', name: 'کِرِمی' },
        { kind: 'bunny', name: 'لپ‌قندی' },
        { kind: 'cat', name: 'میشی' },
        { kind: 'panda', name: 'بامبو' },
        { kind: 'sheep', name: 'ابری' },
        { kind: 'duck', name: 'قات‌قات' },
      ],
    };
  }
}

### BODY:

<div style="position: relative; width: 1280px; height: 900px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; overflow: hidden">

<div style="position: absolute; left: 48px; top: 44px; width: 440px">
<svg sc-camel-view-box="0 0 440 430" width="440" height="430" role="img" aria-label="جعبه‌ی هدیه‌ی پیشتم با نشان، تگ شماره و استیکر">
<defs>
<linearGradient id="pk-front" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#1BB8EE"></stop>
<stop offset="1" stop-color="#00A6DF"></stop>
</linearGradient>
</defs>
<ellipse cx="216" cy="408" rx="196" ry="15" fill="#04202E" opacity=".12"></ellipse>

<rect x="60" y="200" width="270" height="196" fill="url(#pk-front)" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></rect>
<polygon points="330,200 372,172 372,368 330,396" fill="#0086B3" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></polygon>
<rect x="180" y="200" width="32" height="196" fill="#fff" stroke="#04202E" stroke-width="3.5"></rect>

<rect x="48" y="150" width="294" height="50" rx="4" fill="#1BB8EE" stroke="#04202E" stroke-width="3.5"></rect>
<polygon points="342,150 384,122 384,172 342,200" fill="#0086B3" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></polygon>
<polygon points="48,150 90,122 384,122 342,150" fill="#56CFF2" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></polygon>
<rect x="180" y="150" width="32" height="50" fill="#fff" stroke="#04202E" stroke-width="3.5"></rect>
<polygon points="180,150 212,150 254,122 222,122" fill="#fff" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></polygon>
<text x="114" y="181" font-family="Vazirmatn, sans-serif" font-size="12" font-weight="800" fill="#04202E" text-anchor="middle">یه بغل، تو یه جعبه</text>

<path d="M236 112 C214 84 176 78 186 106 C194 128 222 124 236 112 Z" fill="#fff" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></path>
<path d="M240 112 C262 84 300 78 290 106 C282 128 254 124 240 112 Z" fill="#fff" stroke="#04202E" stroke-width="3.5" stroke-linejoin="round"></path>
<path d="M234 118 L220 138 L229 140 L240 120 Z" fill="#fff" stroke="#04202E" stroke-width="3" stroke-linejoin="round"></path>
<path d="M242 118 L256 138 L247 140 L238 120 Z" fill="#fff" stroke="#04202E" stroke-width="3" stroke-linejoin="round"></path>
<circle cx="238" cy="112" r="8" fill="#fff" stroke="#04202E" stroke-width="3.5"></circle>

<circle cx="196" cy="282" r="50" fill="#fff" stroke="#04202E" stroke-width="3.5"></circle>
<circle cx="196" cy="282" r="40" fill="none" stroke="#00ABE7" stroke-width="2.5" stroke-dasharray="2 5" stroke-linecap="round"></circle>
<g transform="translate(196 280) scale(2.1)">
<path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="1.6" stroke-linejoin="round"></path>
</g>
<text x="196" y="372" font-family="Vazirmatn, sans-serif" font-size="30" font-weight="900" fill="#04202E" text-anchor="middle">پیشتم</text>

<g transform="translate(104 262) rotate(-12) scale(1.35)">
<path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"></path>
</g>
<g transform="translate(300 252) rotate(12) scale(.95)">
<path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.6" stroke-linejoin="round"></path>
</g>
<g transform="translate(296 338) rotate(10)">
<circle r="19" fill="#fff" stroke="#04202E" stroke-width="2.5"></circle>
<g fill="#04202E" transform="scale(.9) translate(-12 -12)">
<ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle>
</g>
</g>

<path d="M246 112 C270 84 300 60 355 50" fill="none" stroke="#04202E" stroke-width="2.5" stroke-linecap="round"></path>
<g transform="rotate(8 361 76)">
<rect x="318" y="34" width="84" height="104" rx="14" fill="#fff" stroke="#04202E" stroke-width="3.5"></rect>
<circle cx="360" cy="48" r="5" fill="#F2FAFD" stroke="#04202E" stroke-width="2.5"></circle>
<text x="360" y="72" font-family="Vazirmatn, sans-serif" font-size="10.5" font-weight="700" fill="#4A6572" text-anchor="middle">هدیه‌ی شماره</text>
<text x="360" y="114" font-family="Vazirmatn, sans-serif" font-size="38" font-weight="900" fill="#04202E" text-anchor="middle">{{n1}}</text>
</g>
</svg>
<div style="padding-top: 6px; font-size: 14px; font-weight: 700; text-align: center">جعبه‌ی کادویی با نشان، تگ شماره و استیکرهای قلب و پنجه</div>
</div>

<div style="position: absolute; left: 540px; top: 60px; width: 420px">
<div style="width: 420px; height: 298px; border-radius: 20px; background: #00ABE7; border: 4px solid #04202E; box-sizing: border-box; position: relative; display: flex; align-items: center; justify-content: center">
<div style="width: 214px; height: 214px; border-radius: 26px; background: #fff; border: 3px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center">
<svg width="162" height="162" sc-camel-view-box="0 0 25 25" role="img" aria-label="QR نمونه"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
<div style="position: absolute; bottom: 14px; right: 18px; display: flex; align-items: center; gap: 6px">
<dc-import name="Logo" size="22" show-name="false" hint-size="22px,22px"></dc-import>
</div>
</div>
<div style="padding-top: 10px; font-size: 14px; font-weight: 700; text-align: center">کارت پستال A6، فقط یه QR (نمونه‌ی غیرقابل‌اسکن)</div>
</div>

<div style="position: absolute; left: 1050px; top: 70px; width: 170px; height: 250px; transform: rotate(9deg); background: #fff; border: 4px solid #04202E; border-radius: 26px; box-sizing: border-box; text-align: center; opacity: 0.92">
<div style="margin: 14px auto 0; width: 20px; height: 20px; border-radius: 10px; background: #F2FAFD; border: 4px solid #04202E; box-sizing: border-box"></div>
<div style="margin-top: 36px; font-size: 13px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 66px; font-weight: 900; line-height: 1.15">{{n2}}</div>
</div>
<div style="position: absolute; left: 980px; top: 120px; width: 190px; height: 280px; transform: rotate(-6deg); background: #fff; border: 4px solid #04202E; border-radius: 28px; box-sizing: border-box; text-align: center; overflow: hidden">
<div style="margin: 16px auto 0; width: 22px; height: 22px; border-radius: 11px; background: #F2FAFD; border: 4px solid #04202E; box-sizing: border-box"></div>
<div style="margin-top: 38px; font-size: 14px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 82px; font-weight: 900; line-height: 1.15">{{n1}}</div>
<div style="position: absolute; left: 0; right: 0; bottom: 0; height: 66px; background: #00ABE7; border-top: 4px solid #04202E; display: flex; align-items: center; justify-content: center; gap: 8px">
<span style="font-size: 20px; font-weight: 900">پیشتم</span>
<svg width="20" height="20" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="3" stroke-linejoin="round"></path></svg>
</div>
</div>
<div style="position: absolute; left: 980px; top: 420px; width: 240px; text-align: center; font-size: 14px; font-weight: 700">تگ شماره‌ی هدیه، از {{n1}} شروع می‌شه</div>

<div style="position: absolute; left: 540px; top: 420px; width: 420px">
<div style="background: #00ABE7; border: 4px solid #04202E; border-radius: 26px; padding: 18px 20px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; align-items: center; justify-items: center">
<svg width="52" height="52" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"></path></svg>
<svg width="52" height="52" sc-camel-view-box="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="#fff"></circle><g fill="#04202E" transform="translate(12 12) scale(.62) translate(-12 -12)"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></g></svg>
<svg width="52" height="52" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"></path></svg>
<svg width="52" height="52" sc-camel-view-box="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="#fff"></circle><g fill="#04202E" transform="translate(12 12) scale(.62) translate(-12 -12)"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></g></svg>
<svg width="52" height="52" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"></path></svg>
<svg width="52" height="52" sc-camel-view-box="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="#fff"></circle><g fill="#04202E" transform="translate(12 12) scale(.62) translate(-12 -12)"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></g></svg>
</div>
<div style="padding-top: 10px; font-size: 14px; font-weight: 700; text-align: center">استیکر قلب قرمز و پنجه، هر چندتا که بخری روی جعبه می‌چسبه</div>
</div>

<div style="position: absolute; left: 48px; right: 48px; top: 590px; height: 270px; border-radius: 34px; background: #D6F1FB; padding: 22px 28px; box-sizing: border-box; display: flex; flex-direction: column; gap: 6px">
<div style="font-size: 18px; font-weight: 900">خانواده‌ی پیشتم</div>
<div style="display: flex; justify-content: space-between; align-items: flex-end; flex: 1">
<sc-for list="{{family}}" as="f" hint-placeholder-count="6">
<div style="display: flex; flex-direction: column; align-items: center; gap: 2px">
<dc-import name="Plush" kind="{{f.kind}}" size="150" hint-size="150px,150px"></dc-import>
<span style="font-size: 15px; font-weight: 800">{{f.name}}</span>
</div>
</sc-for>
</div>
</div>

</div>

==========================================
### FILE: 12-پشت کارت پستال.html
### TITLE: پشت کارت پستال
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    return { giftNo: fa(Number(this.props.nextNo ?? 101)) };
  }
}

### BODY:

<div style="position: relative; width: 960px; height: 680px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; overflow: hidden; padding: 36px; display: flex; gap: 28px">

<div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; align-items: center; gap: 12px">
<dc-import name="Logo" size="40" show-name="false" hint-size="40px,40px"></dc-import>
<span style="font-size: 26px; font-weight: 900">پیشتم</span>
</div>
<div style="font-size: 17px; line-height: 1.95; font-weight: 600">این کارت یه پیام کوچیک داره. پیامش فقط با اسکن کردن QR روی روبه‌رو باز می‌شه؛ رمزش رو هم فقط کسی بلده که این کارت دستشه.</div>
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px">
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 34px; height: 34px; border-radius: 17px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900">۱</span><span style="font-size: 16px; font-weight: 700">QR رو اسکن کن</span></div>
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 34px; height: 34px; border-radius: 17px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900">۲</span><span style="font-size: 16px; font-weight: 700">رمز کارت رو وارد کن</span></div>
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 34px; height: 34px; border-radius: 17px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900">۳</span><span style="font-size: 16px; font-weight: 700">پیامت رو ببین</span></div>
</div>
<div style="margin-top: auto; background: #fff; border: 2px solid #04202E; border-radius: 16px; padding: 12px 16px; display: inline-flex; align-self: flex-start; align-items: center; gap: 10px">
<span style="font-size: 13px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</span>
<span style="font-size: 30px; font-weight: 900; line-height: 1">{{giftNo}}</span>
</div>
</div>

<div style="flex: 0 0 360px; display: flex; flex-direction: column; gap: 14px">
<div style="flex: 1; position: relative; background: #fff; border: 2.5px solid #04202E; border-radius: 16px; box-sizing: border-box; padding: 18px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; justify-content: space-between; align-items: flex-start">
<span style="font-size: 12px; font-weight: 700; color: #4A6572">از طرف</span>
<span style="width: 84px; height: 100px; border: 2px dashed #00ABE7; border-radius: 8px; background: #E3F6FD; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #006387; text-align: center; line-height: 1.6">جای تمبر</span>
</div>
<div style="font-size: 12px; font-weight: 700; color: #4A6572; margin-top: auto">به</div>
<div style="border-bottom: 1.5px solid #CFE6EF; height: 26px"></div>
<div style="border-bottom: 1.5px solid #CFE6EF; height: 26px"></div>
<div style="border-bottom: 1.5px solid #CFE6EF; height: 26px"></div>
</div>
<div style="background: #00ABE7; border: 2.5px solid #04202E; border-radius: 16px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 14px; font-weight: 900">یه بغل، تو یه جعبه</span>
<svg width="22" height="22" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round"></path></svg>
</div>
</div>
</div>

==========================================
### FILE: 13-پیشتم، صفحه‌ی اصلی.html
### TITLE: پیشتم، صفحه‌ی اصلی
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const done = Number(this.props.charityDone ?? 0);
    const target = Math.max(1, Number(this.props.charityTarget ?? 30));
    return {
      price: money(Number(this.props.price ?? 890000)),
      nextNo: fa(Number(this.props.nextNo ?? 101)),
      done: fa(done),
      target: '[هدف]',
      pct: Math.min(100, Math.round((done / target) * 100)),
      products: [
        { kind: 'bear', name: 'کِرِمی', traits: 'بغلی · آروم · شیرین', bg: '#FFE8D1' },
        { kind: 'bunny', name: 'لپ‌قندی', traits: 'شیطون · بازیگوش', bg: '#FFE0EA' },
        { kind: 'cat', name: 'میشی', traits: 'ناز · کم‌حرف · لوس', bg: '#E7E0FA' },
        { kind: 'panda', name: 'بامبو', traits: 'خوابالو · مهربون', bg: '#DDF3EA' },
        { kind: 'sheep', name: 'ابری', traits: 'نرم · خندون · پفی', bg: '#FFF3C9' },
        { kind: 'duck', name: 'قات‌قات', traits: 'شاد · پرسروصدا', bg: '#D7F1FB' },
      ],
      faq: [
        { q: 'دوستم می‌فهمه کی فرستاده؟', a: 'فقط اگه اسمت رو بنویسی. اگه ناشناس بفرستی، تو جعبه و کارت هیچ اسمی نیست.' },
        { q: 'چقدر طول می‌کشه برسه؟', a: 'سفارش‌ها آماده و تحویل پست می‌شن. زمان دقیق رو موقع ثبت آدرس گیرنده می‌بینی.' },
        { q: 'چرا همه‌ی جعبه‌ها یه قیمتن؟', a: 'چون نمی‌خوایم هدیه‌ی گرون‌تر یعنی دوستیِ بیشتر. اینجا مهربونی وزن نداره.' },
        { q: 'پول قلب و پنجه‌ها کجا می‌ره؟', a: 'کامل برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. رسید و عکس تحویل رو تو دفتر مهربونی می‌ذاریم.' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 3800px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 26px; font-size: 15px; font-weight: 700">
<a class="nav" href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a class="nav" href="#friends" style="text-decoration: none">دوست‌های پشمالو</a>
<a class="nav" href="#how" style="text-decoration: none">چطوری کار می‌کنه؟</a>
<a class="nav" href="#card" style="text-decoration: none">کارت پستال</a>
<a class="nav" href="#love" style="text-decoration: none">دفتر مهربونی</a>
<a class="nav" href="#faq" style="text-decoration: none">سؤال‌های رایج</a>
</nav>
<div style="display: flex; align-items: center; gap: 10px">
<a href="Desktop-Builder.dc.html" aria-label="سبد خرید" style="width: 48px; height: 48px; border-radius: 24px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20 8H6"></path><circle cx="9.5" cy="20" r="1.3"></circle><circle cx="17" cy="20" r="1.3"></circle></svg>
</a>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</div>
</header>

<section style="background: #00ABE7; margin-top: 6px">
<div style="max-width: 1200px; margin: 0 auto; padding: 56px 24px 64px; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; gap: 40px">
<div style="flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 20px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 13.5px; font-weight: 700; padding: 8px 16px; border-radius: 16px">ویژه‌ی دخترای مهربون</span>
<h1 style="margin: 0; font-size: clamp(38px, 5.2vw, 68px); line-height: 1.35; font-weight: 900">می‌خوای یکی رو خوشحال کنی؟</h1>
<p style="margin: 0; font-size: 19px; line-height: 2; font-weight: 500; max-width: 560px">یه دوست پشمالو، یه کارت پستال با پیام قشنگ خودت و یه عالمه مهربونی؛ درست می‌فرستیمش دم در خونه‌ی دوستت.</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px">
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; height: 58px; padding: 0 34px; border-radius: 29px; display: flex; align-items: center">بساز و بفرست</a>
<a href="#how" style="text-decoration: none; border: 2.5px solid #04202E; color: #04202E; font-size: 16px; font-weight: 700; height: 58px; box-sizing: border-box; padding: 0 28px; border-radius: 29px; display: flex; align-items: center">چطوری کار می‌کنه؟</a>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 8px; font-size: 14px; font-weight: 700">
<span>ارسال ناشناس</span><span>کارت QR رمزدار</span><span>یه قیمت برای همه</span>
</div>
</div>
<div style="flex: 1 1 340px; min-width: 0; display: flex; justify-content: center">
<div style="position: relative; width: min(460px, 100%); aspect-ratio: 1 / 1; overflow: hidden">
<div style="position: absolute; inset: 0; border-radius: 50%; background: #66CDF1"></div>
<div style="position: absolute; left: 50%; top: 50%; margin: -170px 0 0 -170px">
<dc-import name="Plush" kind="bear" size="340" hint-size="340px,340px"></dc-import>
</div>
<div style="position: absolute; top: 10%; right: 6%; transform: rotate(5deg); background: #fff; border: 3px solid #04202E; border-radius: 18px; padding: 10px 18px 8px; text-align: center">
<div style="font-size: 12px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 40px; font-weight: 900; line-height: 1.1">{{nextNo}}</div>
</div>
<svg style="position: absolute; bottom: 14%; right: 10%" width="44" height="44" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(-12)"></path></svg>
<svg style="position: absolute; top: 24%; left: 8%" width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(14)"></path></svg>
</div>
</div>
</div>
</section>

<div style="background: #04202E; color: #fff; padding: 14px 0; overflow: hidden; white-space: nowrap; font-size: 18px; font-weight: 800; display: flex; gap: 28px; align-items: center; justify-content: center">
<span>یه بغل، تو یه جعبه</span><span style="color: #F0426B">♥</span><span>یه بغل، تو یه جعبه</span><span style="color: #00ABE7">♥</span><span>یه بغل، تو یه جعبه</span><span style="color: #F0426B">♥</span><span>یه بغل، تو یه جعبه</span>
</div>

<section id="how" style="max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px">
<span style="font-size: 14px; font-weight: 800; color: #006387">سه قدم ساده</span>
<h2 style="margin: 0; font-size: 38px; line-height: 1.4; font-weight: 900">چطوری کار می‌کنه؟</h2>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<div style="flex: 1 1 300px; min-width: 0; background: #CFEFFB; border-radius: 32px; padding: 26px; display: flex; flex-direction: column; gap: 14px">
<div style="height: 150px; display: flex; align-items: flex-end; justify-content: center; gap: 0; overflow: hidden">
<dc-import name="Plush" kind="bunny" size="108" hint-size="108px,108px"></dc-import>
<dc-import name="Plush" kind="bear" size="132" hint-size="132px,132px"></dc-import>
<dc-import name="Plush" kind="cat" size="108" hint-size="108px,108px"></dc-import>
</div>
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">۱</span>
<span style="font-size: 22px; font-weight: 900">دوستت رو انتخاب کن</span>
</div>
<p style="margin: 0; font-size: 15.5px; line-height: 1.95; font-weight: 500; color: #1F3E4D">از بین شش تا دوست پشمالو یکی رو بردار. همه‌شون یه قیمت دارن، پس فقط به دلت گوش بده.</p>
</div>
<div style="flex: 1 1 300px; min-width: 0; background: #FFE0EA; border-radius: 32px; padding: 26px; display: flex; flex-direction: column; gap: 14px">
<div style="height: 150px; display: flex; align-items: center; justify-content: center">
<div style="width: 190px; height: 130px; background: #fff; border: 3px solid #04202E; border-radius: 14px; transform: rotate(-4deg); display: flex; align-items: center; justify-content: center">
<svg width="92" height="92" sc-camel-view-box="0 0 25 25" aria-hidden="true"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">۲</span>
<span style="font-size: 22px; font-weight: 900">کارت پستالت رو بنویس</span>
</div>
<p style="margin: 0; font-size: 15.5px; line-height: 1.95; font-weight: 500; color: #1F3E4D">پیامت رو بنویس، عکس یا ویدیو بذار و یه رمز انتخاب کن. دوستت با اسکن QR کارت، همه‌ش رو می‌بینه.</p>
</div>
<div style="flex: 1 1 300px; min-width: 0; background: #FFF3C9; border-radius: 32px; padding: 26px; display: flex; flex-direction: column; gap: 14px">
<div style="height: 150px; display: flex; align-items: center; justify-content: center">
<div style="background: #fff; border: 3.5px solid #04202E; border-radius: 20px; padding: 12px 26px 8px; text-align: center; transform: rotate(4deg)">
<div style="font-size: 13px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 64px; font-weight: 900; line-height: 1.1">{{nextNo}}</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">۳</span>
<span style="font-size: 22px; font-weight: 900">ما می‌فرستیم، تو لذتشو ببر</span>
</div>
<p style="margin: 0; font-size: 15.5px; line-height: 1.95; font-weight: 500; color: #1F3E4D">جعبه‌ی کادویی با شماره‌ی هدیه می‌رسه دستش. اگه بخوای، بدون اسم تو می‌رسه.</p>
</div>
</div>
</section>

<section id="friends" style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 28px">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 14px; font-weight: 800; color: #006387">یه قیمت برای همه</span>
<h2 style="margin: 0; font-size: 38px; line-height: 1.4; font-weight: 900">دوست‌های پشمالو</h2>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 14px 22px; font-size: 15px; line-height: 1.8; font-weight: 600; color: #1F3E4D">همه‌ی جعبه‌ها <b style="color: #04202E">{{price}} تومان</b>؛ چون مهربونی وزن نداره.</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<sc-for list="{{products}}" as="p" hint-placeholder-count="6">
<a href="Desktop-Builder.dc.html" style="flex: 1 1 170px; min-width: 0; box-sizing: border-box; text-decoration: none; color: #04202E; background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 12px 12px 18px; display: flex; flex-direction: column; gap: 6px">
<div style="height: 180px; border-radius: 20px; background: {{p.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{p.kind}}" size="150" hint-size="150px,150px"></dc-import>
</div>
<div style="font-size: 18px; font-weight: 800; padding-top: 8px">{{p.name}}</div>
<div style="font-size: 13px; font-weight: 500; color: #4A6572">{{p.traits}}</div>
<div style="font-size: 14.5px; font-weight: 800; color: #006387">{{price}} تومان</div>
</a>
</sc-for>
</div>
</section>

<section id="card" style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="background: #D6F1FB; border-radius: 40px; padding: 48px 40px; display: flex; flex-wrap: wrap; align-items: center; gap: 40px">
<div style="flex: 1 1 320px; min-width: 0; display: flex; justify-content: center">
<div style="width: min(380px, 100%); aspect-ratio: 10 / 7; background: #00ABE7; border: 4px solid #04202E; border-radius: 22px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg)">
<div style="width: 58%; aspect-ratio: 1 / 1; background: #fff; border: 3px solid #04202E; border-radius: 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: center">
<svg width="72%" sc-camel-view-box="0 0 25 25" aria-hidden="true"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
</div>
</div>
<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #006387">کارت پستالِ رمزدار</span>
<h2 style="margin: 0; font-size: 36px; line-height: 1.45; font-weight: 900">فقط یه QR، یه دنیا حرف</h2>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 500; color: #1F3E4D">همراه هر جعبه یه کارت پستال می‌فرستیم که فقط یه QR روشه. دوستت اسکنش می‌کنه، رمزی که تو انتخاب کردی رو می‌زنه و صفحه‌ی خودش باز می‌شه؛ با پیام، عکس یا ویدیوی تو.</p>
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px">
<span style="background: #fff; border: 1.5px solid #CFE6EF; border-radius: 16px; padding: 8px 16px; font-size: 14px; font-weight: 700">۱. اسکن می‌کنه</span>
<span style="background: #fff; border: 1.5px solid #CFE6EF; border-radius: 16px; padding: 8px 16px; font-size: 14px; font-weight: 700">۲. رمز رو می‌زنه</span>
<span style="background: #fff; border: 1.5px solid #CFE6EF; border-radius: 16px; padding: 8px 16px; font-size: 14px; font-weight: 700">۳. پیامت رو می‌بینه</span>
</div>
</div>
</div>
</section>

<section id="love" style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="background: #04202E; color: #fff; border-radius: 40px; padding: 52px 44px; display: flex; flex-wrap: wrap; gap: 36px; align-items: center">
<div style="flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 16px; align-items: flex-start">
<div style="display: flex; gap: 10px">
<span style="width: 56px; height: 56px; border-radius: 28px; background: #F0426B; display: flex; align-items: center; justify-content: center">
<svg width="28" height="28" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff"></path></svg>
</span>
<span style="width: 56px; height: 56px; border-radius: 28px; background: #00ABE7; display: flex; align-items: center; justify-content: center">
<svg width="28" height="28" sc-camel-view-box="0 0 24 24" fill="#04202E" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</span>
</div>
<h2 style="margin: 0; font-size: 38px; line-height: 1.5; font-weight: 900">با هر قلب، یه هدیه می‌ره پیش یه بچه</h2>
<p style="margin: 0; font-size: 16.5px; line-height: 2; font-weight: 500; color: #D3EEF9">قلب قرمز و پنجه رو هر چندتا که دلت خواست می‌تونی هنگام سفارش به جعبه اضافه کنی. پولش می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. رسید و عکس تحویل همه‌ی ارسال‌ها تو دفتر مهربونی ثبت می‌شه.</p>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 30px; border-radius: 27px; display: flex; align-items: center">قلب اضافه کن</a>
</div>
<div style="flex: 1 1 320px; min-width: 0; background: #0A3146; border-radius: 30px; padding: 28px; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 700; color: #BFE9F8">اولین بسته‌ی خیریه</span>
<div style="display: flex; align-items: baseline; gap: 10px">
<span style="font-size: 64px; line-height: 1.1; font-weight: 900; color: #00ABE7">{{done}}</span>
<span style="font-size: 20px; font-weight: 700">از {{target}} هدیه</span>
</div>
<div style="height: 14px; border-radius: 7px; background: #0E3C52; overflow: hidden">
<div style="height: 14px; border-radius: 7px; background: #00ABE7; width: {{pct}}%"></div>
</div>
<span style="font-size: 13.5px; line-height: 1.9; font-weight: 500; color: #D3EEF9">وقتی به {{target}} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم و مدرکش رو همین‌جا می‌ذاریم.</span>
</div>
</div>
</section>

<section id="faq" style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<h2 style="margin: 0 0 28px; font-size: 38px; line-height: 1.4; font-weight: 900">سؤال‌های رایج</h2>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<sc-for list="{{faq}}" as="q" hint-placeholder-count="4">
<div style="flex: 1 1 460px; min-width: 0; box-sizing: border-box; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 24px 26px; display: flex; flex-direction: column; gap: 10px">
<div style="font-size: 18px; font-weight: 800">{{q.q}}</div>
<div style="font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">{{q.a}}</div>
</div>
</sc-for>
</div>
</section>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 56px 24px 40px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 36px 60px; justify-content: space-between">
<div style="flex: 1 1 280px; display: flex; flex-direction: column; gap: 14px">
<dc-import name="Logo" size="44" hint-size="150px,44px"></dc-import>
<span style="font-size: 15px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="#how" style="text-decoration: none">چطوری کار می‌کنه؟</a>
<a href="#friends" style="text-decoration: none">دوست‌های پشمالو</a>
<a href="#love" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="#faq" style="text-decoration: none">سؤال‌های رایج</a>
<span>قوانین و شرایط</span>
<span>حریم خصوصی</span>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
<span>[نماد اعتماد]</span>
</div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 14-ساخت هدیه.html
### TITLE: ساخت هدیه
### SCRIPT:

class Component extends DCLogic {
  state = { picked: 'bear', occ: 0, len: 0, anon: false, h: 5, p: 3 };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const money = () => '[قیمت]';
    const price = Number(this.props.price ?? 890000);
    const charm = Number(this.props.charm ?? 50000);
    const list = [
      { kind: 'bear', name: 'کِرِمی', chips: ['بغلی', 'آروم', 'شیرین'], bg: '#FFE8D1' },
      { kind: 'bunny', name: 'لپ‌قندی', chips: ['شیطون', 'بازیگوش', 'پرانرژی'], bg: '#FFE0EA' },
      { kind: 'cat', name: 'میشی', chips: ['ناز', 'کم‌حرف', 'لوس'], bg: '#E7E0FA' },
      { kind: 'panda', name: 'بامبو', chips: ['خوابالو', 'مهربون', 'آروم'], bg: '#DDF3EA' },
      { kind: 'sheep', name: 'ابری', chips: ['نرم', 'خندون', 'پفی'], bg: '#FFF3C9' },
      { kind: 'duck', name: 'قات‌قات', chips: ['شاد', 'پرسروصدا', 'سرحال'], bg: '#D7F1FB' },
    ];
    const picked = this.state.picked;
    const items = list.map((x) => ({
      ...x,
      traits: x.chips.join(' · '),
      isOn: x.kind === picked,
      border: x.kind === picked ? '#00ABE7' : '#E1EFF5',
      pick: () => this.setState({ picked: x.kind }),
    }));
    const labels = ['همین‌طوری', 'دلم تنگ شده', 'زودتر خوب شی', 'تولدت مبارک'];
    const holders = [
      'مثلاً: همین‌طوری گفتم یه بغل برات بفرستم، چون دوستت دارم…',
      'مثلاً: دلم برات خیلی تنگ شده، زود بیا ببینمت…',
      'مثلاً: زودتر خوب شو، بدون تو هیچ‌چی مزه نداره…',
      'مثلاً: تولدت مبارک عزیزم، امسال بهترین سالِ زندگیته…',
    ];
    const occasions = labels.map((label, i) => ({
      label,
      isOn: i === this.state.occ,
      bg: i === this.state.occ ? '#00ABE7' : '#fff',
      border: i === this.state.occ ? '#04202E' : '#CFE6EF',
      pick: () => this.setState({ occ: i }),
    }));
    const { h, p, anon } = this.state;
    const rows = [];
    if (h > 0) rows.push({ title: 'قلب قرمز × ' + fa(h), sub: 'برای بچه‌های بی‌سرپرست', amount: money(h * charm) });
    if (p > 0) rows.push({ title: 'پنجه × ' + fa(p), sub: 'برای پناهگاه حیوونا', amount: money(p * charm) });
    return {
      price: money(price),
      charm: money(charm),
      giftNo: fa(Number(this.props.nextNo ?? 101)),
      items,
      sel: list.find((x) => x.kind === picked) || list[0],
      occasions,
      ph: holders[this.state.occ],
      len: fa(this.state.len),
      onType: (e) => this.setState({ len: (e.target.value || '').length }),
      anon,
      showName: !anon,
      toggleAnon: () => this.setState({ anon: !anon }),
      switchBg: anon ? '#00ABE7' : '#C7DCE5',
      knobStyle: 'position:absolute;top:3px;width:26px;height:26px;border-radius:13px;background:#fff;box-shadow:0 2px 5px rgba(4,32,46,0.28);' + (anon ? 'left:3px' : 'right:3px'),
      hearts: fa(h),
      paws: fa(p),
      heartPlus: () => this.setState({ h: h + 1 }),
      heartMinus: () => this.setState({ h: Math.max(0, h - 1) }),
      pawPlus: () => this.setState({ p: p + 1 }),
      pawMinus: () => this.setState({ p: Math.max(0, p - 1) }),
      rows,
      total: money(price + (h + p) * charm),
    };
  }
}

### BODY:

<div style="min-height: 2100px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 24px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="44" hint-size="150px,44px"></dc-import></a>
<a href="Desktop-Home.dc.html" style="text-decoration: none; font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; color: #04202E">
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
برگشت به صفحه‌ی اصلی</a>
</header>

<div style="max-width: 1200px; margin: 0 auto; padding: 14px 24px 0; box-sizing: border-box">
<h1 style="margin: 0; font-size: clamp(32px, 4vw, 48px); line-height: 1.4; font-weight: 900">هدیه‌ت رو بساز</h1>
<p style="margin: 8px 0 0; font-size: 17px; line-height: 1.9; font-weight: 500; color: #1F3E4D">چهار تا قدم، همه تو یه صفحه. هر جا خواستی برگرد و عوضش کن.</p>
</div>

<div style="max-width: 1200px; margin: 0 auto; padding: 24px 24px 80px; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px">

<div style="flex: 999 1 560px; min-width: 0; display: flex; flex-direction: column; gap: 20px">

<section style="background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #00ABE7; border: 2.5px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 900">۱</span>
<h2 style="margin: 0; font-size: 24px; font-weight: 900">دوستت رو انتخاب کن</h2>
<span style="margin-right: auto; font-size: 14px; font-weight: 700; color: #006387">همه {{price}} تومان</span>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px">
<sc-for list="{{items}}" as="p" hint-placeholder-count="6">
<button type="button" sc-camel-on-click="{{p.pick}}" aria-pressed="{{p.isOn}}" style="position: relative; flex: 1 1 150px; min-width: 0; box-sizing: border-box; text-align: right; cursor: pointer; background: #fff; border-radius: 24px; padding: 8px 8px 12px; border: 3px solid {{p.border}}; display: flex; flex-direction: column; gap: 2px; color: #04202E">
<div style="height: 128px; border-radius: 16px; background: {{p.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{p.kind}}" size="112" hint-size="112px,112px"></dc-import>
</div>
<div style="font-size: 16px; font-weight: 800; padding-top: 6px">{{p.name}}</div>
<div style="font-size: 12px; font-weight: 500; color: #4A6572">{{p.traits}}</div>
<sc-if value="{{p.isOn}}" hint-placeholder-val="{{ false }}">
<span style="position: absolute; top: 14px; left: 14px; width: 28px; height: 28px; border-radius: 14px; background: #00ABE7; border: 2.5px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center">
<svg width="15" height="15" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>
</span>
</sc-if>
</button>
</sc-for>
</div>
</section>

<section style="background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #00ABE7; border: 2.5px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 900">۲</span>
<h2 style="margin: 0; font-size: 24px; font-weight: 900">کارت پستالت رو بنویس</h2>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
<sc-for list="{{occasions}}" as="o" hint-placeholder-count="4">
<button type="button" sc-camel-on-click="{{o.pick}}" aria-pressed="{{o.isOn}}" style="height: 44px; padding: 0 20px; border-radius: 22px; font-size: 14.5px; font-weight: 700; cursor: pointer; background: {{o.bg}}; color: #04202E; border: 1.5px solid {{o.border}}">{{o.label}}</button>
</sc-for>
</div>
<div style="background: #F8FDFF; border: 1.5px solid #CFE6EF; border-radius: 24px; padding: 16px 18px 12px; display: flex; flex-direction: column; gap: 8px">
<label for="dmsg" style="font-size: 14px; font-weight: 800">پیامت</label>
<textarea id="dmsg" rows="5" sc-camel-max-length="400" sc-camel-on-input="{{onType}}" placeholder="{{ph}}" style="border: none; outline: none; resize: none; background: transparent; font-size: 16px; line-height: 1.95; color: #04202E; min-height: 120px; direction: rtl"></textarea>
<div style="display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #4A6572"><span>متن، عکس یا ویدیو؛ هر چی دلت خواست</span><span>{{len}} / ۴۰۰</span></div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px">
<button type="button" style="flex: 1 1 200px; height: 84px; border-radius: 22px; background: #E3F6FD; border: 2px dashed #00ABE7; color: #04202E; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 15px; font-weight: 700; cursor: pointer">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><circle cx="9" cy="11" r="1.8"></circle><path d="M4 17l5-4 4 3 3-2 4 3"></path></svg>افزودن عکس</button>
<button type="button" style="flex: 1 1 200px; height: 84px; border-radius: 22px; background: #FFE9F0; border: 2px dashed #F0426B; color: #04202E; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 15px; font-weight: 700; cursor: pointer">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="3"></rect><path d="M16 11l5-3v8l-5-3"></path></svg>افزودن ویدیو</button>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px">
<div style="flex: 1 1 260px; display: flex; flex-direction: column; gap: 8px">
<label for="dpw" style="font-size: 14px; font-weight: 800">رمز کارت</label>
<input id="dpw" type="text" placeholder="مثلاً اسم اولین جایی که با هم رفتید" style="height: 54px; box-sizing: border-box; border-radius: 18px; border: 1.5px solid #CFE6EF; background: #fff; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl">
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500; color: #4A6572">فقط کسی که رمز رو بدونه، پیامت رو می‌بینه.</span>
</div>
<div style="flex: 1 1 260px; display: flex; flex-direction: column; gap: 8px">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
<span style="font-size: 14px; font-weight: 800">ناشناس بفرست</span>
<button type="button" role="switch" aria-checked="{{anon}}" aria-label="ارسال ناشناس" sc-camel-on-click="{{toggleAnon}}" style="position: relative; flex: 0 0 auto; width: 54px; height: 32px; border-radius: 16px; border: none; padding: 0; cursor: pointer; background: {{switchBg}}">
<span style="{{knobStyle}}"></span>
</button>
</div>
<sc-if value="{{showName}}" hint-placeholder-val="{{ true }}">
<label for="dnm" style="position: absolute; left: -9999px">اسم تو</label>
<input id="dnm" type="text" placeholder="اسم تو" style="height: 54px; box-sizing: border-box; border-radius: 18px; border: 1.5px solid #CFE6EF; background: #fff; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl">
</sc-if>
<sc-if value="{{anon}}" hint-placeholder-val="{{ false }}">
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500; color: #4A6572">توی جعبه هیچ اسمی نمی‌ذاریم.</span>
</sc-if>
</div>
</div>
</section>

<section style="background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #00ABE7; border: 2.5px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 900">۳</span>
<h2 style="margin: 0; font-size: 24px; font-weight: 900">یه ذره مهربونی اضافه کن</h2>
</div>
<p style="margin: 0; font-size: 15px; line-height: 1.95; font-weight: 500; color: #1F3E4D">قلب قرمز و پنجه، استیکرای کوچیکی‌ان که روی جعبه می‌چسبن. پولشون می‌ره برای هدیه به بچه‌های بی‌سرپرست و پناهگاه حیوونا. هر چندتا که دلت خواست.</p>
<div style="display: flex; flex-wrap: wrap; gap: 14px">
<div style="flex: 1 1 280px; background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 26px; padding: 16px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 56px; height: 56px; border-radius: 28px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="32" height="32" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
</span>
<div style="display: flex; flex-direction: column"><span style="font-size: 17px; font-weight: 900">قلب قرمز</span><span style="font-size: 12.5px; font-weight: 500; color: #1F3E4D">برای بچه‌های بی‌سرپرست</span></div>
</div>
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 13.5px; font-weight: 700">هر کدوم {{charm}} تومان</span>
<div style="display: flex; align-items: center; gap: 4px; background: #fff; border-radius: 26px; padding: 4px">
<button type="button" aria-label="یکی کم کن" sc-camel-on-click="{{heartMinus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F2FAFD; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"></path></svg></button>
<span style="min-width: 38px; text-align: center; font-size: 20px; font-weight: 900">{{hearts}}</span>
<button type="button" aria-label="یکی زیاد کن" sc-camel-on-click="{{heartPlus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F0426B; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></button>
</div>
</div>
</div>
<div style="flex: 1 1 280px; background: #E3F6FD; border: 1.5px solid #B5E3F5; border-radius: 26px; padding: 16px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 56px; height: 56px; border-radius: 28px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="30" height="30" sc-camel-view-box="0 0 24 24" fill="#00ABE7" stroke="#04202E" stroke-width="1.4" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.5" ry="4.2"></ellipse><circle cx="5.5" cy="11" r="2.3"></circle><circle cx="9.5" cy="6.5" r="2.3"></circle><circle cx="14.5" cy="6.5" r="2.3"></circle><circle cx="18.5" cy="11" r="2.3"></circle></svg>
</span>
<div style="display: flex; flex-direction: column"><span style="font-size: 17px; font-weight: 900">پنجه</span><span style="font-size: 12.5px; font-weight: 500; color: #1F3E4D">برای پناهگاه حیوونا</span></div>
</div>
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 13.5px; font-weight: 700">هر کدوم {{charm}} تومان</span>
<div style="display: flex; align-items: center; gap: 4px; background: #fff; border-radius: 26px; padding: 4px">
<button type="button" aria-label="یکی کم کن" sc-camel-on-click="{{pawMinus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #F2FAFD; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"></path></svg></button>
<span style="min-width: 38px; text-align: center; font-size: 20px; font-weight: 900">{{paws}}</span>
<button type="button" aria-label="یکی زیاد کن" sc-camel-on-click="{{pawPlus}}" style="width: 44px; height: 44px; border-radius: 22px; border: none; background: #00ABE7; cursor: pointer; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></button>
</div>
</div>
</div>
</div>
</section>

<section style="background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; align-items: center; gap: 12px">
<span style="width: 40px; height: 40px; border-radius: 20px; background: #00ABE7; border: 2.5px solid #04202E; box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 900">۴</span>
<h2 style="margin: 0; font-size: 24px; font-weight: 900">گیرنده‌ی هدیه</h2>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 14px">
<div style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 6px"><label for="drn" style="font-size: 13px; font-weight: 700; color: #4A6572">اسم گیرنده</label><input id="drn" type="text" placeholder="اسم دوستت" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 6px"><label for="drp" style="font-size: 13px; font-weight: 700; color: #4A6572">شماره‌ی موبایل گیرنده</label><input id="drp" type="tel" inputmode="numeric" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 6px"><label for="drc" style="font-size: 13px; font-weight: 700; color: #4A6572">استان و شهر</label><input id="drc" type="text" placeholder="مثلاً تهران، تهران" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 6px"><label for="drz" style="font-size: 13px; font-weight: 700; color: #4A6572">کدپستی</label><input id="drz" type="text" inputmode="numeric" placeholder="کدپستی ده رقمی" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="flex: 1 1 100%; display: flex; flex-direction: column; gap: 6px"><label for="dra" style="font-size: 13px; font-weight: 700; color: #4A6572">آدرس کامل</label><textarea id="dra" rows="3" placeholder="خیابان، کوچه، پلاک، واحد" style="border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 12px 16px; font-size: 16px; line-height: 1.8; color: #04202E; outline: none; resize: none; direction: rtl"></textarea></div>
</div>
</section>

</div>

<aside aria-label="خلاصه‌ی سفارش" style="flex: 1 1 340px; min-width: 0; max-width: 100%; display: flex; flex-direction: column; gap: 14px">
<div style="position: relative; background: #00ABE7; border-radius: 28px; display: flex; align-items: stretch; overflow: hidden">
<div style="flex: 0 0 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 0">
<span style="font-size: 12px; font-weight: 700">هدیه‌ی شماره</span>
<span style="font-size: 40px; font-weight: 900; line-height: 1.15">{{giftNo}}</span>
</div>
<div style="width: 0; margin: 12px 0; border-right: 2.5px dashed #04202E"></div>
<div style="flex: 1; padding: 16px; display: flex; flex-direction: column; justify-content: center; gap: 3px">
<span style="font-size: 15px; font-weight: 900">این شماره مال هدیه‌ی توئه</span>
<span style="font-size: 12.5px; line-height: 1.8; font-weight: 500">روی جعبه و کارت پستال می‌شینه.</span>
</div>
<div style="position: absolute; top: -12px; right: 98px; width: 24px; height: 24px; border-radius: 12px; background: #F2FAFD"></div>
<div style="position: absolute; bottom: -12px; right: 98px; width: 24px; height: 24px; border-radius: 12px; background: #F2FAFD"></div>
</div>

<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 8px 20px 18px">
<div style="padding: 14px 0 6px; font-size: 18px; font-weight: 900">خلاصه‌ی سفارش</div>
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<div style="flex: 0 0 auto; width: 68px; height: 68px; border-radius: 18px; background: {{sel.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{sel.kind}}" size="58" hint-size="58px,58px"></dc-import>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">{{sel.name}}، دوست پشمالو</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">جعبه‌ی کادویی + کارت پستال QR</span>
</div>
<span style="font-size: 14px; font-weight: 800">{{price}}</span>
</div>
<sc-for list="{{rows}}" as="r" hint-placeholder-count="2">
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E3F0F5">
<div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 15px; font-weight: 800">{{r.title}}</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">{{r.sub}}</span>
</div>
<span style="font-size: 14px; font-weight: 800">{{r.amount}}</span>
</div>
</sc-for>
<div style="display: flex; justify-content: space-between; padding: 12px 0 6px; font-size: 13.5px; font-weight: 600; color: #4A6572"><span>هزینه‌ی ارسال</span><span>بعد از ثبت آدرس حساب می‌شه</span></div>
<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0 14px; font-size: 18px; font-weight: 900"><span>جمع کل</span><span>{{total}} تومان</span></div>
<div style="background: #F8FDFF; border: 1.5px solid #CFE6EF; border-radius: 18px; padding: 4px 4px 4px 12px; display: flex; align-items: center; gap: 8px; margin-bottom: 14px">
<label for="dcp" style="position: absolute; left: -9999px">کد تخفیف</label>
<input id="dcp" type="text" placeholder="کد تخفیف داری؟" style="flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-size: 15px; color: #04202E; height: 42px; direction: rtl">
<button type="button" style="height: 42px; padding: 0 18px; border-radius: 14px; border: none; background: #D6F1FB; color: #04202E; font-size: 14px; font-weight: 800; cursor: pointer">اعمال</button>
</div>
<a href="M-Success.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; height: 58px; border-radius: 29px; display: flex; align-items: center; justify-content: center; gap: 8px">پرداخت و فرستادن
<svg width="20" height="20" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#04202E"></path></svg></a>
<div style="padding-top: 12px; text-align: center; font-size: 12.5px; line-height: 1.9; font-weight: 500; color: #4A6572">پرداخت از درگاه امن بانکی با کارت‌های عضو شتاب انجام می‌شه.</div>
</div>
</aside>

</div>
</div>

==========================================
### FILE: 01-سفارش ثبت شد.html
### TITLE: سفارش ثبت شد
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const no = Number(this.props.nextNo ?? 101);
    const h = Number(this.props.hearts ?? 5);
    const p = Number(this.props.paws ?? 3);
    return {
      giftNo: fa(no),
      orderNo: fa(1000 + no),
      charmLine: 'با این سفارش ' + fa(h) + ' قلب و ' + fa(p) + ' پنجه هم برای بچه‌های بی‌سرپرست و حیوونا ثبت شد. رسیدش تو دفتر مهربونی می‌مونه.',
      steps: [
        { n: '۱', bg: '#CDEFFB', title: 'پرداخت شد', sub: 'همین حالا' },
        { n: '۲', bg: '#FFE0EA', title: 'بسته‌بندی', sub: '[مدت بسته‌بندی]' },
        { n: '۳', bg: '#FFF3C9', title: 'تحویل پست', sub: 'کد رهگیری رو بعداً برات می‌فرستیم' },
        { n: '۴', bg: '#E7E0FA', title: 'رسیدن به دوستت', sub: 'با کارت QR و شماره‌ی ' + fa(no) },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1100px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="position: relative; background: #00ABE7; border-radius: 0 0 36px 36px; padding: 22px 24px 30px; overflow: hidden">
<div style="position: absolute; left: -60px; bottom: -80px; width: 220px; height: 220px; border-radius: 110px; background: #66CDF1"></div>
<div style="display: flex; align-items: center; justify-content: space-between; position: relative">
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
<span style="background: #fff; border: 2px solid #04202E; border-radius: 14px; padding: 4px 10px; font-size: 12px; font-weight: 800">شماره‌ی سفارش {{orderNo}}</span>
</div>
<div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 22px; text-align: center">
<span style="width: 70px; height: 70px; border-radius: 35px; background: #fff; border: 3px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="34" height="34" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>
</span>
<h1 style="margin: 0; font-size: 30px; line-height: 1.5; font-weight: 900">سفارشت ثبت شد!</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.9; font-weight: 600">هدیه‌ی شماره‌ی <b>{{giftNo}}</b> داره آماده می‌شه.</p>
</div>
</div>

<div style="margin: -18px 20px 0; position: relative; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 8px 22px rgba(4,32,46,0.07)">
<div style="font-size: 15px; font-weight: 800">مسیر هدیه تا دست دوستت</div>
<sc-for list="{{steps}}" as="s" hint-placeholder-count="4">
<div style="display: flex; gap: 12px; align-items: flex-start">
<div style="display: flex; flex-direction: column; align-items: center">
<span style="width: 30px; height: 30px; border-radius: 15px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 900">{{s.n}}</span>
<span style="width: 2px; height: 22px; background: #CFE6EF"></span>
</div>
<div style="display: flex; flex-direction: column; gap: 2px; padding-top: 3px">
<span style="font-size: 14.5px; font-weight: 800">{{s.title}}</span>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">{{s.sub}}</span>
</div>
</div>
</sc-for>
</div>

<div style="margin: 16px 20px 0; background: #04202E; color: #fff; border-radius: 26px; padding: 18px; display: flex; align-items: center; gap: 14px">
<div style="flex: 0 0 auto; width: 84px; height: 84px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="66" height="66" sc-camel-view-box="0 0 25 25" aria-hidden="true"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 16px; font-weight: 900">کارت پستالت آماده‌ست</span>
<span style="font-size: 12.5px; line-height: 1.85; font-weight: 500; color: #D3EEF9">رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه.</span>
</div>
</div>

<div style="margin: 16px 20px 0; background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 22px; padding: 14px 16px; display: flex; align-items: center; gap: 12px">
<svg width="30" height="30" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<div style="font-size: 13px; line-height: 1.9; font-weight: 600">{{charmLine}}</div>
</div>

<div style="margin-top: auto; padding: 16px 20px 28px; display: flex; flex-direction: column; gap: 10px">
<a href="M-MyGifts.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center">هدیه‌هام رو ببین</a>
<a href="Main.dc.html" style="text-decoration: none; border: 2px solid #04202E; color: #04202E; font-size: 15px; font-weight: 800; height: 50px; box-sizing: border-box; border-radius: 25px; display: flex; align-items: center; justify-content: center">برگرد به خانه</a>
</div>

</div>

==========================================
### FILE: 02-هدیه‌هام.html
### TITLE: هدیه‌هام
### SCRIPT:

class Component extends DCLogic {
  state = { tab: 'sent' };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const tab = this.state.tab;
    const sent = [
      { kind: 'bear', bg: '#FFE8D1', who: 'برای نازنین', no: fa(101), date: '۲۰ مهر', extra: 'ناشناس', status: 'در راه', statusBg: '#CDEFFB' },
      { kind: 'bunny', bg: '#FFE0EA', who: 'برای مریم', no: fa(107), date: '۲۸ مهر', extra: '۲ قلب', status: 'تحویل شد', statusBg: '#D7F5E4' },
      { kind: 'cat', bg: '#E7E0FA', who: 'برای مامان', no: fa(112), date: '۵ آبان', extra: '۱ پنجه', status: 'بسته‌بندی', statusBg: '#FFF3C9' },
    ];
    const recv = [
      { kind: 'panda', bg: '#DDF3EA', who: 'از یه دوست ناشناس', no: fa(98), date: '۱۲ مهر', extra: 'کارت باز شده', status: 'پیام رو دیدی', statusBg: '#D7F5E4' },
    ];
    const items = tab === 'sent' ? sent : recv;
    return {
      sentOn: tab === 'sent',
      recvOn: tab === 'recv',
      sentBg: tab === 'sent' ? '#fff' : 'transparent',
      recvBg: tab === 'recv' ? '#fff' : 'transparent',
      showSent: () => this.setState({ tab: 'sent' }),
      showRecv: () => this.setState({ tab: 'recv' }),
      items,
      count: fa(items.length),
      charmCount: fa(tab === 'sent' ? 7 : 0),
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 1100px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 6px">
<h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 900">هدیه‌هام</h1>
<a href="M-Pick.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 14px; font-weight: 800; height: 42px; padding: 0 16px; border-radius: 21px; display: flex; align-items: center">+ هدیه‌ی جدید</a>
</div>

<div style="display: flex; gap: 6px; margin: 10px 20px 0; background: #E3F0F5; border-radius: 22px; padding: 5px">
<button type="button" aria-pressed="{{sentOn}}" sc-camel-on-click="{{showSent}}" style="flex: 1; height: 42px; border: none; border-radius: 17px; cursor: pointer; font-family: inherit; font-size: 14.5px; font-weight: 800; background: {{sentBg}}; color: #04202E">فرستاده‌ها</button>
<button type="button" aria-pressed="{{recvOn}}" sc-camel-on-click="{{showRecv}}" style="flex: 1; height: 42px; border: none; border-radius: 17px; cursor: pointer; font-family: inherit; font-size: 14.5px; font-weight: 800; background: {{recvBg}}; color: #04202E">دریافتی‌ها</button>
</div>

<div style="display: flex; gap: 10px; padding: 14px 20px 0">
<div style="flex: 1; background: #fff; border: 1px solid #DDEEF5; border-radius: 20px; padding: 12px; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 12px; font-weight: 600; color: #4A6572">تعداد هدیه‌ها</span>
<span style="font-size: 22px; font-weight: 900">{{count}}</span>
</div>
<div style="flex: 1; background: #FFE9F0; border: 1px solid #F7C5D3; border-radius: 20px; padding: 12px; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 12px; font-weight: 600; color: #4A6572">قلب و پنجه‌ی تو</span>
<span style="font-size: 22px; font-weight: 900">{{charmCount}}</span>
</div>
</div>

<div style="display: flex; flex-direction: column; gap: 12px; padding: 14px 20px 0">
<sc-for list="{{items}}" as="g" hint-placeholder-count="3">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 14px; display: flex; gap: 14px; align-items: center">
<div style="flex: 0 0 auto; width: 64px; height: 64px; border-radius: 18px; background: {{g.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{g.kind}}" size="54" hint-size="54px,54px"></dc-import>
</div>
<div style="flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
<span style="font-size: 15.5px; font-weight: 800">{{g.who}}</span>
<span style="background: #04202E; color: #fff; font-size: 12px; font-weight: 800; padding: 3px 10px; border-radius: 12px">{{g.no}}</span>
</div>
<span style="font-size: 12.5px; font-weight: 500; color: #4A6572">{{g.date}} · {{g.extra}}</span>
<span style="align-self: flex-start; background: {{g.statusBg}}; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 10px">{{g.status}}</span>
</div>
</div>
</sc-for>
</div>

<div style="margin: 16px 20px 0; border: 2px dashed #99D6EE; border-radius: 24px; padding: 16px; display: flex; align-items: center; gap: 12px">
<svg width="26" height="26" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<span style="font-size: 13px; line-height: 1.9; font-weight: 600; color: #1F3E4D">برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن.</span>
</div>

<nav aria-label="ناوبری اصلی" style="margin-top: auto; background: rgba(255,255,255,0.94); border-top: 1px solid #D3E8F0; padding: 8px 12px 26px; display: flex; justify-content: space-between; align-items: flex-end">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z"></path></svg>دوست‌ها</a>
<a href="M-Pick.dc.html" aria-label="ساخت هدیه" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #04202E; font-size: 11px; font-weight: 800; margin-top: -30px">
<span style="width: 58px; height: 58px; border-radius: 29px; background: #00ABE7; border: 4px solid #fff; box-shadow: 0 6px 16px rgba(0,171,231,0.35); display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></span>بساز</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #006387; font-size: 11px; font-weight: 800">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 03-ورود یا ثبت‌نام.html
### TITLE: ورود یا ثبت‌نام
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const signup = (this.props.mode ?? 'login') === 'signup';
    return {
      title: signup ? 'بیا عضو شو' : 'خوش اومدی',
      subtitle: signup ? 'با شماره‌ت حساب بساز تا هدیه‌هات رو همیشه ببینی.' : 'با شماره‌ت وارد شو تا هدیه‌هات رو ببینی.',
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 844px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column; overflow: hidden; padding: 16px 24px 28px">

<div style="display: flex; align-items: center; justify-content: space-between">
<a href="M-Pick.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<div style="margin-top: 26px; display: flex; flex-direction: column; gap: 10px">
<h1 style="margin: 0; font-size: 30px; line-height: 1.45; font-weight: 900">{{title}}</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">{{subtitle}}</p>
</div>

<div style="margin-top: 26px; display: flex; flex-direction: column; gap: 12px">
<label for="phone" style="font-size: 14px; font-weight: 800">شماره‌ی موبایلت</label>
<input id="phone" type="tel" inputmode="numeric" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" style="height: 58px; box-sizing: border-box; border-radius: 20px; border: 2px solid #04202E; background: #fff; padding: 0 18px; font-size: 18px; font-weight: 600; color: #04202E; outline: none; direction: ltr; text-align: right">
<button type="button" style="height: 56px; border-radius: 28px; border: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; cursor: pointer">ادامه</button>
</div>

<div style="margin-top: 22px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #4A6572">
<span style="flex: 1; height: 1.5px; background: #CFE6EF"></span>یا<span style="flex: 1; height: 1.5px; background: #CFE6EF"></span>
</div>

<div style="margin-top: 16px; display: flex; flex-direction: column; gap: 10px">
<button type="button" style="height: 52px; border-radius: 26px; border: 2px solid #04202E; background: transparent; color: #04202E; font-size: 15px; font-weight: 800; cursor: pointer">ادامه با ایمیل</button>
</div>

<div style="margin-top: auto; font-size: 12.5px; line-height: 1.9; font-weight: 500; color: #4A6572; text-align: center">با ادامه، <span style="color: #006387; font-weight: 800">قوانین و حریم خصوصی</span> رو قبول می‌کنی.</div>

</div>

==========================================
### FILE: 04-درباره‌ی پیشتم.html
### TITLE: درباره‌ی پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      timeline: [
        { year: '[سال]', bg: '#CDEFFB', title: 'ایده شکل گرفت', body: '[یه خاطره‌ی کوتاه از اولین فکری که به پیشتم منجر شد.]' },
        { year: '[سال]', bg: '#FFE0EA', title: 'اولین جعبه‌ها', body: '[اولین بسته‌ای که بسته‌بندی شد و چطور رسید دست گیرنده.]' },
        { year: '[سال]', bg: '#FFF3C9', title: 'اولین بسته‌ی خیریه', body: '[چه تعداد هدیه برای چه خیریه‌ای فرستاده شد.]' },
        { year: 'امروز', bg: '#E7E0FA', title: 'هنوز داریم یاد می‌گیریم', body: 'هر هدیه‌ای که می‌فرستیم، یه قدم جلوتر از قبله.' },
      ],
      stats: [
        { num: '[عدد]', label: 'هدیه‌ی فرستاده‌شده' },
        { num: '[عدد]', label: 'قلب و پنجه برای خیریه‌ها' },
        { num: '[عدد]', label: 'نفر در تیم' },
        { num: '[عدد]', label: 'کارت پستال با پیام' },
      ],
      values: [
        { n: '۱', bg: '#CDEFFB', title: 'یه قیمت برای همه', body: 'همه‌ی جعبه‌ها یه قیمتن. ما نمی‌خوایم هدیه‌ی گران‌تر یعنی دوستی بیشتر.' },
        { n: '۲', bg: '#FFE0EA', title: 'شفافیت کامل', body: 'هر قلب و پنجه‌ای که فروخته می‌شه، رسیدش رو تو دفتر مهربونی می‌ذاریم.' },
        { n: '۳', bg: '#FFF3C9', title: 'مهربونی اول', body: 'هر تصمیمی رو با این سؤال می‌گیریم: این کار یکی رو لبخندی‌تر می‌کنه؟' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 3000px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 26px; font-size: 15px; font-weight: 700">
<a class="nav" href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a class="nav" href="Desktop-Home.dc.html#friends" style="text-decoration: none">دوست‌های پشمالو</a>
<a class="nav" href="Desktop-Home.dc.html#how" style="text-decoration: none">چطوری کار می‌کنه؟</a>
<a class="nav" href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
<a class="nav" href="Desktop-About.dc.html" style="text-decoration: none; color: #006387">درباره‌ی ما</a>
</nav>
<div style="display: flex; align-items: center; gap: 10px">
<a href="Desktop-Builder.dc.html" aria-label="سبد خرید" style="width: 48px; height: 48px; border-radius: 24px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20 8H6"></path><circle cx="9.5" cy="20" r="1.3"></circle><circle cx="17" cy="20" r="1.3"></circle></svg>
</a>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</div>
</header>

<section style="background: #00ABE7; margin-top: 6px">
<div style="max-width: 1200px; margin: 0 auto; padding: 60px 24px 72px; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; gap: 40px">
<div style="flex: 1 1 460px; min-width: 0; display: flex; flex-direction: column; gap: 20px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 13.5px; font-weight: 700; padding: 8px 16px; border-radius: 16px">درباره‌ی پیشتم</span>
<h1 style="margin: 0; font-size: clamp(38px, 5vw, 62px); line-height: 1.35; font-weight: 900">یه دوست پشمالو، یه قلب بزرگ</h1>
<p style="margin: 0; font-size: 19px; line-height: 2; font-weight: 500; max-width: 560px">پیشتم از یه ایده‌ی ساده شروع شد: هدیه دادن نباید فقط برای خوشحال کردن خودمون باشه. می‌خوایم هر کسی بتونه با یه جعبه‌ی کوچیک، دل یکی رو گرم کنه.</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px">
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; height: 58px; padding: 0 34px; border-radius: 29px; display: flex; align-items: center">همین حالا شروع کن</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none; border: 2.5px solid #04202E; color: #04202E; font-size: 16px; font-weight: 700; height: 58px; box-sizing: border-box; padding: 0 28px; border-radius: 29px; display: flex; align-items: center">دفتر مهربونی</a>
</div>
</div>
<div style="flex: 1 1 340px; min-width: 0; display: flex; justify-content: center">
<div style="position: relative; width: min(440px, 100%); aspect-ratio: 1 / 1; overflow: hidden">
<div style="position: absolute; inset: 0; border-radius: 50%; background: #66CDF1"></div>
<div style="position: absolute; left: 50%; top: 50%; margin: -150px 0 0 -150px">
<dc-import name="Plush" kind="sheep" size="300" hint-size="300px,300px"></dc-import>
</div>
<svg style="position: absolute; top: 12%; right: 10%" width="44" height="44" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(-12)"></path></svg>
<svg style="position: absolute; bottom: 16%; left: 10%" width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(14)"></path></svg>
</div>
</div>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 80px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start">
<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<span style="font-size: 14px; font-weight: 800; color: #006387">از طرف بنیانگذار</span>
<h2 style="margin: 0; font-size: 38px; line-height: 1.4; font-weight: 900">نامه‌ی بنیانگذار</h2>
<div style="background: #FFF3C9; border: 2px dashed #E0B43A; border-radius: 20px; padding: 14px 18px; font-size: 14px; line-height: 1.9; font-weight: 700">[این بخش رو با داستان واقعی خودت پر کن. متن زیر فقط یه پیش‌نویسه.]</div>
<p style="margin: 0; font-size: 16.5px; line-height: 2.1; font-weight: 500; color: #1F3E4D">همیشه فکر می‌کردم بهترین هدیه‌ها اون‌هایی‌ان که بی‌دلیل داده می‌شن. یه دستمال گردن دست‌دوز، یه یادداشت کوتاه، یه عروسک که کنار تخت یکی می‌خوابه.</p>
<p style="margin: 0; font-size: 16.5px; line-height: 2.1; font-weight: 500; color: #1F3E4D">پیشتم رو ساختیم که این حس رو راحت‌تر به دست بیاری. قیمت‌ها یکی‌ان، چون مهربونی وزن نداره و نمی‌خوایم کسی با هدیه‌ی گران‌تر فخر بفروشه.</p>
<div style="font-size: 17px; font-weight: 900; margin-top: 6px">[نام بنیانگذار]، بنیانگذار پیشتم</div>
</div>
<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<div style="background: #CFEFFB; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 16px">
<div style="height: 210px; display: flex; align-items: flex-end; justify-content: center; gap: 4px; overflow: hidden">
<dc-import name="Plush" kind="bear" size="150" hint-size="150px,150px"></dc-import>
<dc-import name="Plush" kind="bunny" size="120" hint-size="120px,120px"></dc-import>
</div>
<div style="font-size: 14px; font-weight: 700; color: #1F3E4D">[عکس کارگاه یا اولین جعبه‌ی بسته‌بندی‌شده رو اینجا بذار]</div>
</div>
</div>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 36px">
<span style="font-size: 14px; font-weight: 800; color: #006387">مسیر ما</span>
<h2 style="margin: 0; font-size: 38px; line-height: 1.4; font-weight: 900">از ایده تا امروز</h2>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<sc-for list="{{timeline}}" as="t" hint-placeholder-count="4">
<div style="flex: 1 1 240px; min-width: 0; box-sizing: border-box; background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 24px; display: flex; flex-direction: column; gap: 12px">
<span style="align-self: flex-start; background: {{t.bg}}; border: 2px solid #04202E; border-radius: 14px; padding: 4px 14px; font-size: 14px; font-weight: 900">{{t.year}}</span>
<div style="font-size: 19px; font-weight: 800">{{t.title}}</div>
<div style="font-size: 14.5px; line-height: 1.95; font-weight: 500; color: #1F3E4D">{{t.body}}</div>
</div>
</sc-for>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="background: #04202E; color: #fff; border-radius: 40px; padding: 48px 40px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between">
<sc-for list="{{stats}}" as="s" hint-placeholder-count="4">
<div style="flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 48px; font-weight: 900; line-height: 1.1; color: #00ABE7">{{s.num}}</span>
<span style="font-size: 15px; font-weight: 600; color: #D3EEF9; line-height: 1.8">{{s.label}}</span>
</div>
</sc-for>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px">
<span style="font-size: 14px; font-weight: 800; color: #006387">چی برامون مهمه</span>
<h2 style="margin: 0; font-size: 38px; line-height: 1.4; font-weight: 900">سه اصلی که هیچ‌وقت عوض نمی‌شن</h2>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<sc-for list="{{values}}" as="v" hint-placeholder-count="3">
<div style="flex: 1 1 280px; min-width: 0; box-sizing: border-box; background: {{v.bg}}; border-radius: 32px; padding: 28px; display: flex; flex-direction: column; gap: 14px">
<span style="width: 52px; height: 52px; border-radius: 26px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900">{{v.n}}</span>
<div style="font-size: 22px; font-weight: 900">{{v.title}}</div>
<div style="font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">{{v.body}}</div>
</div>
</sc-for>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center">
<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<span style="font-size: 14px; font-weight: 800; color: #006387">پشت صحنه</span>
<h2 style="margin: 0; font-size: 36px; line-height: 1.45; font-weight: 900">بسته‌بندی با دست، ارسال با دقت</h2>
<p style="margin: 0; font-size: 16px; line-height: 2.05; font-weight: 500; color: #1F3E4D">هر جعبه قبل از رفتن، یه بار دیگه چک می‌شه: شماره‌ی هدیه درست روی تگ، کارت QR سالم، و استیکرهای قلب و پنجه سر جاشون. تیم ما کوچیکه و پیام‌های مشتری‌ها رو خودمون می‌خونیم.</p>
<p style="margin: 0; font-size: 16px; line-height: 2.05; font-weight: 500; color: #1F3E4D">[تعداد] نفر تو تیم داریم. اسم‌ها و نقش‌هاشون رو اینجا بنویس تا آدم‌ها چهره‌ی پیشتم رو ببینن.</p>
</div>
<div style="flex: 1 1 380px; min-width: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px">
<div style="background: #FFE0EA; border-radius: 26px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 8px">
<dc-import name="Plush" kind="panda" size="130" hint-size="130px,130px"></dc-import>
<span style="font-size: 14px; font-weight: 800">بسته‌بندی</span>
</div>
<div style="background: #E7E0FA; border-radius: 26px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 8px">
<dc-import name="Plush" kind="cat" size="130" hint-size="130px,130px"></dc-import>
<span style="font-size: 14px; font-weight: 800">پاسخ به پیام‌ها</span>
</div>
<div style="background: #FFF3C9; border-radius: 26px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 8px">
<dc-import name="Plush" kind="duck" size="130" hint-size="130px,130px"></dc-import>
<span style="font-size: 14px; font-weight: 800">ارسال</span>
</div>
<div style="background: #DDF3EA; border-radius: 26px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 8px">
<dc-import name="Plush" kind="bunny" size="130" hint-size="130px,130px"></dc-import>
<span style="font-size: 14px; font-weight: 800">دفتر مهربونی</span>
</div>
</div>
</div>
</section>

<section style="max-width: 1200px; margin: 88px auto 0; padding: 0 24px; box-sizing: border-box">
<div style="background: #00ABE7; border-radius: 40px; padding: 52px 44px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px">
<div style="display: flex; flex-direction: column; gap: 10px; max-width: 620px">
<h2 style="margin: 0; font-size: 36px; line-height: 1.45; font-weight: 900">آماده‌ای یکی رو خوشحال کنی؟</h2>
<p style="margin: 0; font-size: 16px; line-height: 1.95; font-weight: 600">یه دوست رو انتخاب کن، یه کارت پستال بنویس، و بقیه‌ش با ما.</p>
</div>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; height: 58px; padding: 0 34px; border-radius: 29px; display: flex; align-items: center">بساز و بفرست</a>
</div>
</section>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 56px 24px 40px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 36px 60px; justify-content: space-between">
<div style="flex: 1 1 280px; display: flex; flex-direction: column; gap: 14px">
<dc-import name="Logo" size="44" hint-size="150px,44px"></dc-import>
<span style="font-size: 15px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
<a href="Desktop-Home.dc.html#faq" style="text-decoration: none">سؤال‌های رایج</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<span>قوانین و شرایط</span>
<span>حریم خصوصی</span>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 15px; font-weight: 600">
<span style="font-size: 16px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 05-ماموریت پیشتم.html
### TITLE: ماموریت پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() { return {}; }
}

### BODY:

<div style="min-height: 2400px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Home.dc.html#friends" style="text-decoration: none">دوست‌های پشمالو</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none; color: #006387">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<section style="max-width: 1200px; margin: 24px auto 0; padding: 0 24px; box-sizing: border-box">
<div style="background: #00ABE7; border-radius: 40px; padding: 64px 56px; display: flex; flex-wrap: wrap; gap: 36px; align-items: center">
<div style="flex: 1 1 460px; min-width: 0; display: flex; flex-direction: column; gap: 18px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 13.5px; font-weight: 700; padding: 8px 16px; border-radius: 16px">ماموریت ما</span>
<h1 style="margin: 0; font-size: clamp(42px, 5.6vw, 72px); line-height: 1.3; font-weight: 900">عشق رو پخش کنیم</h1>
<p style="margin: 0; font-size: 19px; line-height: 2; font-weight: 600; max-width: 580px">دنیایی رو می‌خوایم که با پخش کردن عشق و مثبت‌اندیشی به هم نزدیک‌تر باشه. هدیه‌ها بهانه‌ن؛ اصل ماجرا، حسیه که وسط جعبه جا می‌گیره.</p>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; height: 58px; padding: 0 34px; border-radius: 29px; display: flex; align-items: center">همین حالا شروع کن</a>
</div>
<div style="flex: 1 1 320px; min-width: 0; display: flex; justify-content: center">
<dc-import name="Plush" kind="duck" size="300" hint-size="300px,300px"></dc-import>
</div>
</div>
</section>

<section style="max-width: 1200px; margin: 0 auto; padding: 88px 24px 0; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 18px">
<div style="flex: 1 1 360px; min-width: 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #006387">بخش ۱</span>
<h2 style="margin: 0; font-size: 26px; font-weight: 900">هدیه، بهانه‌ی حرف زدن</h2>
<p style="margin: 0; font-size: 15.5px; line-height: 2; font-weight: 500; color: #1F3E4D">یه عروسک کنار یه کارت پستال، کافیه تا یه نفر یادش بیفته کسی بهش فکر می‌کنه. ما هم همه‌ی دقت‌مون رو گذاشتیم روی همین حس: طراحی عروسک‌ها، انتخاب متن کارت، و بسته‌بندی‌ای که وقتی بازش می‌کنی لبخند بزنی.</p>
</div>
<div style="flex: 1 1 360px; min-width: 0; background: #FFE9F0; border: 1px solid #F7C5D3; border-radius: 32px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #006387">بخش ۲</span>
<h2 style="margin: 0; font-size: 26px; font-weight: 900">یه قیمت، بدون فخر</h2>
<p style="margin: 0; font-size: 15.5px; line-height: 2; font-weight: 500; color: #1F3E4D">همه‌ی جعبه‌ها یه قیمتن. نمی‌خوایم کسی با هدیه‌ی گران‌تر، حس بهتری داشته باشه. اگه کسی با قلب و پنجه‌های زیادی فخر بفروشه، عیبی نداره؛ اون پول مستقیم به بچه‌ها و حیوونا رسیده و مدرکش هست.</p>
</div>
<div style="flex: 1 1 360px; min-width: 0; background: #DDF3EA; border: 1px solid #B5E3CE; border-radius: 32px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #006387">بخش ۳</span>
<h2 style="margin: 0; font-size: 26px; font-weight: 900">شفافیت، نه شعار</h2>
<p style="margin: 0; font-size: 15.5px; line-height: 2; font-weight: 500; color: #1F3E4D">[درصد سود یا مبلغی که به خیریه‌ها می‌رسه] رو همین‌جا بنویس. هر گزارش، تاریخ و رسید ارسال رو تو دفتر مهربونی می‌ذاریم.</p>
</div>
</section>

<section style="max-width: 1200px; margin: 88px auto 0; padding: 0 24px; box-sizing: border-box">
<div style="background: #04202E; color: #fff; border-radius: 40px; padding: 52px 44px; display: flex; flex-wrap: wrap; gap: 40px; align-items: center">
<div style="flex: 1 1 440px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<span style="font-size: 14px; font-weight: 800; color: #00ABE7">یه بخش بیشتر</span>
<h2 style="margin: 0; font-size: 36px; line-height: 1.5; font-weight: 900">ما با هم کار می‌کنیم</h2>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 500; color: #D3EEF9">اگه یه خیریه، پناهگاه یا گروه داوطلبی می‌شناسی که کار خوبی می‌کنه، بهمون بگو. [فرم پیشنهاد خیریه] همین‌جا می‌ذاریم.</p>
</div>
<a href="Desktop-Contact.dc.html" style="flex: 0 0 auto; text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 30px; border-radius: 27px; display: flex; align-items: center">پیشنهاد بده</a>
</div>
</section>

<section style="max-width: 1200px; margin: 88px auto 0; padding: 0 24px; box-sizing: border-box; text-align: center">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 40px; padding: 48px 32px; display: flex; flex-direction: column; gap: 18px; align-items: center">
<h2 style="margin: 0; font-size: 34px; font-weight: 900">هر هدیه، یه قدم کوچیک برای دنیای مهربون‌تر</h2>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; height: 58px; padding: 0 36px; border-radius: 29px; display: flex; align-items: center">بساز و بفرست</a>
</div>
</section>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 06-تماس با پیشتم.html
### TITLE: تماس با پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() { return { noop: (e) => { if (e && e.preventDefault) e.preventDefault(); } }; }
}

### BODY:

<div style="min-height: 1400px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none; color: #006387">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 24px 0; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 36px; align-items: flex-start">

<div style="flex: 1 1 360px; min-width: 0; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 14px; font-weight: 800; color: #006387">ما اینجاییم</span>
<h1 style="margin: 0; font-size: 44px; line-height: 1.35; font-weight: 900">باهامون حرف بزن</h1>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 500; color: #1F3E4D">اگه سؤالی داشتی، یا جعبه‌ت یه جای دیگه رفت، یا می‌خوای چیزی رو عوض کنی، فقط کافیه این فرم رو پر کنی. قبلش شاید جواب سؤالت تو <a href="Desktop-Shipping.dc.html" style="color: #006387; font-weight: 800">ارسال و بازگشت</a> باشه.</p>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 44px; height: 44px; border-radius: 22px; background: #D6F1FB; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">@</span><div style="display: flex; flex-direction: column"><span style="font-size: 13px; color: #4A6572; font-weight: 600">ایمیل</span><span style="font-size: 16px; font-weight: 800">[ایمیل پشتیبانی]</span></div></div>
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 44px; height: 44px; border-radius: 22px; background: #FFE0EA; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">☎</span><div style="display: flex; flex-direction: column"><span style="font-size: 13px; color: #4A6572; font-weight: 600">تلفن</span><span style="font-size: 16px; font-weight: 800">[شماره‌ی تماس]</span></div></div>
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 44px; height: 44px; border-radius: 22px; background: #FFF3C9; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900">۸</span><div style="display: flex; flex-direction: column"><span style="font-size: 13px; color: #4A6572; font-weight: 600">ساعت پاسخ‌گویی</span><span style="font-size: 16px; font-weight: 800">[روزها و ساعت‌ها]</span></div></div>
</div>
</div>

<form style="flex: 1 1 480px; min-width: 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 32px; display: flex; flex-direction: column; gap: 16px; box-sizing: border-box" sc-camel-on-submit="{{noop}}">
<div style="display: flex; flex-wrap: wrap; gap: 14px">
<div style="flex: 1 1 200px; display: flex; flex-direction: column; gap: 6px"><label for="cn" style="font-size: 14px; font-weight: 800">اسمت</label><input id="cn" type="text" required="" placeholder="اسم و فامیل" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="flex: 1 1 200px; display: flex; flex-direction: column; gap: 6px"><label for="ce" style="font-size: 14px; font-weight: 800">ایمیل</label><input id="ce" type="email" required="" placeholder="ایمیلت رو بنویس" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: ltr; text-align: right"></div>
</div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="cc" style="font-size: 14px; font-weight: 800">موضوع</label><sc-raw-select id="cc" required="" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none">
<option value="">یکی رو انتخاب کن</option>
<option value="address">می‌خوام آدرس سفارشم رو عوض کنم</option>
<option value="delivered">نوشته تحویل شده ولی نرسیده</option>
<option value="late">چرا این‌قدر طول کشید؟</option>
<option value="cancel">می‌خوام سفارشم رو لغو کنم</option>
<option value="card">می‌خوام متن کارتم رو عوض کنم</option>
<option value="product">مشکل با عروسک یا بسته دارم</option>
<option value="other">یه چیز دیگه</option>
</sc-raw-select></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="co" style="font-size: 14px; font-weight: 800">شماره‌ی سفارش (اختیاری)</label><input id="co" type="text" placeholder="مثلاً ۱۰۱" style="height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="cm" style="font-size: 14px; font-weight: 800">پیامت</label><textarea id="cm" rows="5" required="" placeholder="هر چی که لازمه بدونیم رو بنویس…" style="border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 12px 16px; font-size: 16px; line-height: 1.85; color: #04202E; outline: none; resize: vertical; direction: rtl"></textarea></div>
<button type="submit" style="height: 56px; border-radius: 28px; border: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; cursor: pointer">بفرست</button>
<span style="font-size: 13px; line-height: 1.8; font-weight: 500; color: #4A6572">[زمان تقریبی جواب دادن رو اینجا بنویس.]</span>
</form>
</div>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 07-نظرها.html
### TITLE: نظرها
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      bars: [
        { stars: '۵' }, { stars: '۴' }, { stars: '۳' }, { stars: '۲' }, { stars: '۱' },
      ],
      cards: [
        { stars: '[امتیاز]', kind: 'bear' },
        { stars: '[امتیاز]', kind: 'bunny' },
        { stars: '[امتیاز]', kind: 'cat' },
        { stars: '[امتیاز]', kind: 'panda' },
        { stars: '[امتیاز]', kind: 'sheep' },
        { stars: '[امتیاز]', kind: 'duck' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 2200px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none; color: #006387">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<div style="max-width: 1200px; margin: 0 auto; padding: 40px 24px 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">
<div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center; justify-content: space-between">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 14px; font-weight: 800; color: #006387">نظر کسایی که هدیه گرفتن</span>
<h1 style="margin: 0; font-size: 44px; line-height: 1.35; font-weight: 900">نظرها</h1>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 22px 26px; display: flex; flex-direction: column; gap: 8px; min-width: 260px">
<span style="font-size: 14px; font-weight: 700; color: #4A6572">میانگین امتیاز</span>
<span style="font-size: 40px; font-weight: 900; line-height: 1.1">[امتیاز]</span>
<span style="font-size: 13.5px; font-weight: 600; color: #4A6572">از [تعداد] نظر</span>
</div>
</div>

<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 26px; display: flex; flex-direction: column; gap: 12px">
<sc-for list="{{bars}}" as="b" hint-placeholder-count="5">
<div style="display: flex; align-items: center; gap: 14px">
<span style="width: 60px; font-size: 14px; font-weight: 700">{{b.stars}} ستاره</span>
<div style="flex: 1; height: 12px; border-radius: 6px; background: #E3F0F5; overflow: hidden"><div style="height: 12px; background: #00ABE7; width: 0%"></div></div>
<span style="width: 110px; text-align: left; font-size: 13.5px; font-weight: 600; color: #4A6572">[درصد] · [تعداد]</span>
</div>
</sc-for>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 18px">
<sc-for list="{{cards}}" as="c" hint-placeholder-count="6">
<div style="flex: 1 1 300px; min-width: 0; box-sizing: border-box; background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 22px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 13px; font-weight: 700; color: #006387">{{c.stars}}</span>
<span style="font-size: 12.5px; font-weight: 600; color: #4A6572">[تاریخ]</span>
</div>
<div style="font-size: 16px; font-weight: 800">[عنوان نظر واقعی مشتری]</div>
<div style="font-size: 14.5px; line-height: 1.95; font-weight: 500; color: #1F3E4D">[متن نظر واقعی مشتری. فقط نظرهای واقعی، با اجازه‌ی خود مشتری، اینجا بیان.]</div>
<div style="margin-top: auto; display: flex; align-items: center; gap: 10px">
<dc-import name="Plush" kind="{{c.kind}}" size="44" hint-size="44px,44px"></dc-import>
<span style="font-size: 13.5px; font-weight: 700">[اسم کوچیک]</span>
</div>
</div>
</sc-for>
</div>

<div style="text-align: center; padding: 12px 0 0"><a href="Desktop-Builder.dc.html" style="text-decoration: none; display: inline-flex; align-items: center; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 30px; border-radius: 27px">خودت هم یه نظر بذار، بعد از دریافت هدیه</a></div>
</div>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 08-ارسال و بازگشت.html
### TITLE: ارسال و بازگشت
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      sections: [
        { n: '۱', bg: '#CDEFFB', title: 'زمان ارسال', body: 'سفارش‌ها بعد از پرداخت حدود [تعداد] روز کاری بسته‌بندی می‌شن. بعدش برای دوستت پست می‌شه و زمان رسیدن بستگی به شهرش داره؛ [توضیح تقریبی زمان پست].' },
        { n: '۲', bg: '#FFE0EA', title: 'هزینه‌ی ارسال', body: '[هزینه‌ی ارسال و اینکه چه موقع حساب می‌شه] رو بنویس. ارسال بعد از ثبت آدرس دوستت محاسبه و نشون داده می‌شه.' },
        { n: '۳', bg: '#FFF3C9', title: 'کجا می‌فرستیم؟', body: 'فعلاً به [شهرها/کشورها] می‌فرستیم. اگه آدرس دوستت جای دیگه‌ست، از ما بپرس.' },
        { n: '۴', bg: '#E7E0FA', title: 'اگه جعبه نرسید یا آسیب دید', body: 'اگه جعبه آسیب دیده یا عروسک اشتباهی رسید، فقط کافیه ظرف [تعداد] روز از تاریخ تحویل با ما تماس بگیری و عکس بفرستی. ما جایگزین می‌فرستیم یا پولت رو برمی‌گردونیم.' },
        { n: '۵', bg: '#DDF3EA', title: 'تغییر آدرس یا لغو سفارش', body: 'تا قبل از بسته‌بندی، می‌تونی آدرس یا متن کارت رو عوض کنی یا سفارش رو لغو کنی. بعد از اون دیگه امکانش نیست، پس زودتر بهمون خبر بده.' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 2000px; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl">

<header style="max-width: 1200px; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none; color: #006387">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<div style="max-width: 920px; margin: 0 auto; padding: 40px 24px 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 14px; font-weight: 800; color: #006387">قبل از سفارش بخون</span>
<h1 style="margin: 0; font-size: 44px; line-height: 1.35; font-weight: 900">ارسال و بازگشت</h1>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 500; color: #1F3E4D">همه‌چی اینجا ساده و روشنه. اگه جوابت رو اینجا پیدا نکردی، از <a href="Desktop-Contact.dc.html" style="color: #006387; font-weight: 800">تماس با ما</a> بپرس.</p>
</div>

<sc-for list="{{sections}}" as="s" hint-placeholder-count="5">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 26px 28px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: center; gap: 12px"><span style="width: 38px; height: 38px; border-radius: 19px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-weight: 900">{{s.n}}</span><h2 style="margin: 0; font-size: 21px; font-weight: 900">{{s.title}}</h2></div>
<div style="font-size: 15px; line-height: 2.05; font-weight: 500; color: #1F3E4D">{{s.body}}</div>
</div>
</sc-for>

<div style="background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 28px; padding: 22px 26px; font-size: 14.5px; line-height: 2; font-weight: 600">[زمان‌های ارسال، هزینه‌ی پست و شرایط بازگشت رو با اعداد واقعی خودت اینجا بنویس. عدد حدسی نذار.]</div>
</div>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 09-درباره‌ی پیشتم.html
### TITLE: درباره‌ی پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      timeline: [
        { year: '[سال]', bg: '#CDEFFB', title: 'ایده شکل گرفت', body: '[یه خاطره‌ی کوتاه از اولین فکری که به پیشتم منجر شد.]' },
        { year: '[سال]', bg: '#FFE0EA', title: 'اولین جعبه‌ها', body: '[اولین بسته‌ای که بسته‌بندی شد و چطور رسید دست گیرنده.]' },
        { year: '[سال]', bg: '#FFF3C9', title: 'اولین بسته‌ی خیریه', body: '[چه تعداد هدیه برای چه خیریه‌ای فرستاده شد.]' },
        { year: 'امروز', bg: '#E7E0FA', title: 'هنوز داریم یاد می‌گیریم', body: 'هر هدیه‌ای که می‌فرستیم، یه قدم جلوتر از قبله.' },
      ],
      stats: [
        { num: '[عدد]', label: 'هدیه‌ی فرستاده‌شده' },
        { num: '[عدد]', label: 'قلب و پنجه برای خیریه‌ها' },
        { num: '[عدد]', label: 'نفر در تیم' },
        { num: '[عدد]', label: 'کارت پستال با پیام' },
      ],
      values: [
        { n: '۱', bg: '#CDEFFB', title: 'یه قیمت برای همه', body: 'همه‌ی جعبه‌ها یه قیمتن. ما نمی‌خوایم هدیه‌ی گران‌تر یعنی دوستی بیشتر.' },
        { n: '۲', bg: '#FFE0EA', title: 'شفافیت کامل', body: 'هر قلب و پنجه‌ای که فروخته می‌شه، رسیدش رو تو دفتر مهربونی می‌ذاریم.' },
        { n: '۳', bg: '#FFF3C9', title: 'مهربونی اول', body: 'هر تصمیمی رو با این سؤال می‌گیریم: این کار یکی رو لبخندی‌تر می‌کنه؟' },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 2600px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<section style="background: #00ABE7; padding: 14px 16px 34px; display: flex; flex-direction: column; gap: 16px">
<span style="align-self: flex-start; background: #04202E; color: #fff; font-size: 13px; font-weight: 700; padding: 7px 14px; border-radius: 14px">درباره‌ی پیشتم</span>
<h1 style="margin: 0; font-size: 30px; line-height: 1.5; font-weight: 900">یه دوست پشمالو، یه قلب بزرگ</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.95; font-weight: 600">پیشتم از یه ایده‌ی ساده شروع شد: هدیه دادن نباید فقط برای خوشحال کردن خودمون باشه. می‌خوایم هر کسی بتونه با یه جعبه‌ی کوچیک، دل یکی رو گرم کنه.</p>
<div style="position: relative; height: 240px; border-radius: 32px; background: #66CDF1; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; margin-top: 6px">
<dc-import name="Plush" kind="sheep" size="200" hint-size="200px,200px"></dc-import>
<svg style="position: absolute; top: 16px; right: 18px" width="36" height="36" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(-12)"></path></svg>
<svg style="position: absolute; bottom: 20px; left: 18px" width="28" height="28" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.6" stroke-linejoin="round" transform="rotate(14)"></path></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px">
<a href="M-Pick.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center">همین حالا شروع کن</a>
<a href="M-Impact.dc.html" style="text-decoration: none; border: 2.5px solid #04202E; color: #04202E; font-size: 15px; font-weight: 700; height: 52px; box-sizing: border-box; border-radius: 26px; display: flex; align-items: center; justify-content: center">دفتر مهربونی</a>
</div>
</section>

<section style="padding: 36px 16px 0; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">از طرف بنیانگذار</span>
<h2 style="margin: 0; font-size: 28px; line-height: 1.45; font-weight: 900">نامه‌ی بنیانگذار</h2>
<div style="background: #FFF3C9; border: 2px dashed #E0B43A; border-radius: 18px; padding: 12px 16px; font-size: 13.5px; line-height: 1.9; font-weight: 700">[این بخش رو با داستان واقعی خودت پر کن. متن زیر فقط یه پیش‌نویسه.]</div>
<p style="margin: 0; font-size: 15.5px; line-height: 2.05; font-weight: 500; color: #1F3E4D">همیشه فکر می‌کردم بهترین هدیه‌ها اون‌هایی‌ان که بی‌دلیل داده می‌شن. یه دستمال گردن دست‌دوز، یه یادداشت کوتاه، یه عروسک که کنار تخت یکی می‌خوابه.</p>
<p style="margin: 0; font-size: 15.5px; line-height: 2.05; font-weight: 500; color: #1F3E4D">پیشتم رو ساختیم که این حس رو راحت‌تر به دست بیاری. قیمت‌ها یکی‌ان، چون مهربونی وزن نداره و نمی‌خوایم کسی با هدیه‌ی گران‌تر فخر بفروشه.</p>
<div style="font-size: 16px; font-weight: 900">[نام بنیانگذار]، بنیانگذار پیشتم</div>
<div style="background: #CFEFFB; border-radius: 28px; padding: 18px; display: flex; flex-direction: column; gap: 12px">
<div style="height: 170px; display: flex; align-items: flex-end; justify-content: center; gap: 4px">
<dc-import name="Plush" kind="bear" size="130" hint-size="130px,130px"></dc-import>
<dc-import name="Plush" kind="bunny" size="104" hint-size="104px,104px"></dc-import>
</div>
<div style="font-size: 13.5px; line-height: 1.8; font-weight: 700; color: #1F3E4D">[عکس کارگاه یا اولین جعبه‌ی بسته‌بندی‌شده رو اینجا بذار]</div>
</div>
</section>

<section style="padding: 40px 16px 0; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">مسیر ما</span>
<h2 style="margin: 0; font-size: 28px; line-height: 1.45; font-weight: 900">از ایده تا امروز</h2>
</div>
<sc-for list="{{timeline}}" as="t" hint-placeholder-count="4">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px">
<span style="align-self: flex-start; background: {{t.bg}}; border: 2px solid #04202E; border-radius: 13px; padding: 3px 12px; font-size: 13.5px; font-weight: 900">{{t.year}}</span>
<div style="font-size: 18px; font-weight: 800">{{t.title}}</div>
<div style="font-size: 14px; line-height: 1.95; font-weight: 500; color: #1F3E4D">{{t.body}}</div>
</div>
</sc-for>
</section>

<section style="padding: 40px 16px 0">
<div style="background: #04202E; color: #fff; border-radius: 32px; padding: 28px 22px; display: flex; flex-wrap: wrap; gap: 24px 16px">
<sc-for list="{{stats}}" as="s" hint-placeholder-count="4">
<div style="flex: 1 1 40%; min-width: 0; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 36px; font-weight: 900; line-height: 1.15; color: #00ABE7">{{s.num}}</span>
<span style="font-size: 14px; font-weight: 600; color: #D3EEF9; line-height: 1.8">{{s.label}}</span>
</div>
</sc-for>
</div>
</section>

<section style="padding: 40px 16px 0; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">چی برامون مهمه</span>
<h2 style="margin: 0; font-size: 26px; line-height: 1.5; font-weight: 900">سه اصلی که هیچ‌وقت عوض نمی‌شن</h2>
</div>
<sc-for list="{{values}}" as="v" hint-placeholder-count="3">
<div style="background: {{v.bg}}; border-radius: 28px; padding: 22px; display: flex; flex-direction: column; gap: 10px">
<span style="width: 46px; height: 46px; border-radius: 23px; background: #04202E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 19px; font-weight: 900">{{v.n}}</span>
<div style="font-size: 19px; font-weight: 900">{{v.title}}</div>
<div style="font-size: 14.5px; line-height: 2; font-weight: 500; color: #1F3E4D">{{v.body}}</div>
</div>
</sc-for>
</section>

<section style="padding: 40px 16px 0; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">پشت صحنه</span>
<h2 style="margin: 0; font-size: 26px; line-height: 1.5; font-weight: 900">بسته‌بندی با دست، ارسال با دقت</h2>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">هر جعبه قبل از رفتن، یه بار دیگه چک می‌شه: شماره‌ی هدیه درست روی تگ، کارت QR سالم، و استیکرهای قلب و پنجه سر جاشون. تیم ما کوچیکه و پیام‌های مشتری‌ها رو خودمون می‌خونیم.</p>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">[تعداد] نفر تو تیم داریم. اسم‌ها و نقش‌هاشون رو اینجا بنویس تا آدم‌ها چهره‌ی پیشتم رو ببینن.</p>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
<div style="background: #FFE0EA; border-radius: 24px; padding: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px">
<dc-import name="Plush" kind="panda" size="110" hint-size="110px,110px"></dc-import>
<span style="font-size: 14px; font-weight: 800">بسته‌بندی</span>
</div>
<div style="background: #E7E0FA; border-radius: 24px; padding: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px">
<dc-import name="Plush" kind="cat" size="110" hint-size="110px,110px"></dc-import>
<span style="font-size: 14px; font-weight: 800">پاسخ به پیام‌ها</span>
</div>
<div style="background: #FFF3C9; border-radius: 24px; padding: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px">
<dc-import name="Plush" kind="duck" size="110" hint-size="110px,110px"></dc-import>
<span style="font-size: 14px; font-weight: 800">ارسال</span>
</div>
<div style="background: #DDF3EA; border-radius: 24px; padding: 14px; display: flex; flex-direction: column; align-items: center; gap: 6px">
<dc-import name="Plush" kind="bunny" size="110" hint-size="110px,110px"></dc-import>
<span style="font-size: 14px; font-weight: 800">دفتر مهربونی</span>
</div>
</div>
</section>

<section style="padding: 40px 16px 0">
<div style="background: #00ABE7; border-radius: 32px; padding: 28px 22px; display: flex; flex-direction: column; gap: 14px">
<h2 style="margin: 0; font-size: 24px; line-height: 1.5; font-weight: 900">آماده‌ای یکی رو خوشحال کنی؟</h2>
<p style="margin: 0; font-size: 15px; line-height: 1.95; font-weight: 600">یه دوست رو انتخاب کن، یه کارت پستال بنویس، و بقیه‌ش با ما.</p>
<a href="M-Pick.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center">بساز و بفرست</a>
</div>
</section>

<footer style="margin-top: auto; background: #04202E; color: #fff; padding: 32px 16px 20px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import>
<span style="font-size: 14.5px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px 14px; font-size: 14.5px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="M-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="M-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="M-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="M-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<a href="M-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="M-Reviews.dc.html" style="text-decoration: none">نظرها</a>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; font-weight: 600">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
<div style="border-top: 1px solid #0E3C52; padding-top: 16px; text-align: center; font-size: 12.5px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>
<nav aria-label="ناوبری اصلی" style="position: sticky; bottom: 0; z-index: 5; margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 8px 10px 22px; display: flex; justify-content: space-between">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>شروع</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 10-ماموریت پیشتم.html
### TITLE: ماموریت پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {};
  }
}

### BODY:

<div style="width: 390px; min-height: 2200px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<section style="margin: 6px 16px 0; background: #00ABE7; border-radius: 32px; padding: 26px 22px 22px; display: flex; flex-direction: column; gap: 14px; align-items: flex-start">
<span style="background: #04202E; color: #fff; font-size: 13px; font-weight: 700; padding: 7px 14px; border-radius: 14px">ماموریت ما</span>
<h1 style="margin: 0; font-size: 32px; line-height: 1.45; font-weight: 900">عشق رو پخش کنیم</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.95; font-weight: 600">دنیایی رو می‌خوایم که با پخش کردن عشق و مثبت‌اندیشی به هم نزدیک‌تر باشه. هدیه‌ها بهانه‌ن؛ اصل ماجرا، حسیه که وسط جعبه جا می‌گیره.</p>
<div style="align-self: center; margin: 4px 0">
<dc-import name="Plush" kind="duck" size="200" hint-size="200px,200px"></dc-import>
</div>
<a href="M-Pick.dc.html" style="align-self: stretch; text-decoration: none; background: #04202E; color: #fff; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center">همین حالا شروع کن</a>
</section>

<section style="padding: 26px 16px 0; display: flex; flex-direction: column; gap: 14px">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 24px 22px; display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 13.5px; font-weight: 800; color: #00779F">بخش ۱</span>
<h2 style="margin: 0; font-size: 22px; font-weight: 900">هدیه، بهانه‌ی حرف زدن</h2>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">یه عروسک کنار یه کارت پستال، کافیه تا یه نفر یادش بیفته کسی بهش فکر می‌کنه. ما هم همه‌ی دقت‌مون رو گذاشتیم روی همین حس: طراحی عروسک‌ها، انتخاب متن کارت، و بسته‌بندی‌ای که وقتی بازش می‌کنی لبخند بزنی.</p>
</div>
<div style="background: #FFE9F0; border: 1px solid #F7C5D3; border-radius: 28px; padding: 24px 22px; display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 13.5px; font-weight: 800; color: #00779F">بخش ۲</span>
<h2 style="margin: 0; font-size: 22px; font-weight: 900">یه قیمت، بدون فخر</h2>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">همه‌ی جعبه‌ها یه قیمتن. نمی‌خوایم کسی با هدیه‌ی گران‌تر، حس بهتری داشته باشه. اگه کسی با قلب و پنجه‌های زیادی فخر بفروشه، عیبی نداره؛ اون پول مستقیم به بچه‌ها و حیوونا رسیده و مدرکش هست.</p>
</div>
<div style="background: #DDF3EA; border: 1px solid #B5E3CE; border-radius: 28px; padding: 24px 22px; display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 13.5px; font-weight: 800; color: #00779F">بخش ۳</span>
<h2 style="margin: 0; font-size: 22px; font-weight: 900">شفافیت، نه شعار</h2>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">[درصد سود یا مبلغی که به خیریه‌ها می‌رسه] رو همین‌جا بنویس. هر گزارش، تاریخ و رسید ارسال رو تو دفتر مهربونی می‌ذاریم.</p>
</div>
</section>

<section style="padding: 26px 16px 0">
<div style="background: #04202E; color: #fff; border-radius: 32px; padding: 28px 22px; display: flex; flex-direction: column; gap: 12px">
<span style="font-size: 13.5px; font-weight: 800; color: #00ABE7">یه بخش بیشتر</span>
<h2 style="margin: 0; font-size: 26px; line-height: 1.55; font-weight: 900">ما با هم کار می‌کنیم</h2>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #D3EEF9">اگه یه خیریه، پناهگاه یا گروه داوطلبی می‌شناسی که کار خوبی می‌کنه، بهمون بگو. [فرم پیشنهاد خیریه] همین‌جا می‌ذاریم.</p>
<a href="M-Contact.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 52px; border-radius: 26px; display: flex; align-items: center; justify-content: center">پیشنهاد بده</a>
</div>
</section>

<section style="padding: 26px 16px 0">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 30px 22px; display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center">
<h2 style="margin: 0; font-size: 22px; line-height: 1.6; font-weight: 900">هر هدیه، یه قدم کوچیک برای دنیای مهربون‌تر</h2>
<a href="M-Pick.dc.html" style="align-self: stretch; text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; border-radius: 27px; display: flex; align-items: center; justify-content: center">بساز و بفرست</a>
</div>
</section>

<footer style="margin-top: auto; background: #04202E; color: #fff; padding: 32px 16px 20px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import>
<span style="font-size: 14.5px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px 14px; font-size: 14.5px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="M-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="M-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="M-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="M-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<a href="M-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="M-Reviews.dc.html" style="text-decoration: none">نظرها</a>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; font-weight: 600">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
<div style="border-top: 1px solid #0E3C52; padding-top: 16px; text-align: center; font-size: 12.5px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>
<nav aria-label="ناوبری اصلی" style="position: sticky; bottom: 0; z-index: 5; margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 8px 10px 22px; display: flex; justify-content: space-between">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>شروع</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 11-تماس با پیشتم.html
### TITLE: تماس با پیشتم
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return { noop: (e) => { if (e && e.preventDefault) e.preventDefault(); } };
  }
}

### BODY:

<div style="width: 390px; min-height: 1500px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<section style="padding: 14px 16px 0; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">ما اینجاییم</span>
<h1 style="margin: 0; font-size: 30px; line-height: 1.45; font-weight: 900">باهامون حرف بزن</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.95; font-weight: 500; color: #1F3E4D">اگه سؤالی داشتی، یا جعبه‌ت یه جای دیگه رفت، یا می‌خوای چیزی رو عوض کنی، فقط کافیه این فرم رو پر کنی. قبلش شاید جواب سؤالت تو <a href="M-Shipping.dc.html" style="color: #00779F; font-weight: 800">ارسال و بازگشت</a> باشه.</p>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 6px 16px; display: flex; flex-direction: column">
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #EAF4F8">
<span style="flex: 0 0 auto; width: 42px; height: 42px; border-radius: 21px; background: #D6F1FB; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg></span>
<div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 12.5px; color: #4A6572; font-weight: 600">ایمیل</span><span style="font-size: 15.5px; font-weight: 800">[ایمیل پشتیبانی]</span></div>
</div>
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #EAF4F8">
<span style="flex: 0 0 auto; width: 42px; height: 42px; border-radius: 21px; background: #FFE0EA; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"></path></svg></span>
<div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 12.5px; color: #4A6572; font-weight: 600">تلفن</span><span style="font-size: 15.5px; font-weight: 800">[شماره‌ی تماس]</span></div>
</div>
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0">
<span style="flex: 0 0 auto; width: 42px; height: 42px; border-radius: 21px; background: #FFF3C9; display: flex; align-items: center; justify-content: center"><svg width="20" height="20" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></span>
<div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 12.5px; color: #4A6572; font-weight: 600">ساعت پاسخ‌گویی</span><span style="font-size: 15.5px; font-weight: 800">[روزها و ساعت‌ها]</span></div>
</div>
</div>
<form style="background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 22px 18px; display: flex; flex-direction: column; gap: 16px; box-sizing: border-box" sc-camel-on-submit="{{noop}}">
<div style="display: flex; flex-direction: column; gap: 6px"><label for="cn" style="font-size: 14px; font-weight: 800">اسمت</label><input id="cn" type="text" required="" placeholder="اسم و فامیل" style="width: 100%; height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="ce" style="font-size: 14px; font-weight: 800">ایمیل</label><input id="ce" type="email" required="" placeholder="you@example.com" style="width: 100%; height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: ltr; text-align: right"></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="cc" style="font-size: 14px; font-weight: 800">موضوع</label><sc-raw-select id="cc" required="" style="width: 100%; height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none">
<option value="">یکی رو انتخاب کن</option>
<option value="address">می‌خوام آدرس سفارشم رو عوض کنم</option>
<option value="delivered">نوشته تحویل شده ولی نرسیده</option>
<option value="late">چرا این‌قدر طول کشید؟</option>
<option value="cancel">می‌خوام سفارشم رو لغو کنم</option>
<option value="card">می‌خوام متن کارتم رو عوض کنم</option>
<option value="product">مشکل با عروسک یا بسته دارم</option>
<option value="other">یه چیز دیگه</option>
</sc-raw-select></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="co" style="font-size: 14px; font-weight: 800">شماره‌ی سفارش (اختیاری)</label><input id="co" type="text" placeholder="مثلاً ۱۰۱" style="width: 100%; height: 52px; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 0 16px; font-size: 16px; color: #04202E; outline: none; direction: rtl"></div>
<div style="display: flex; flex-direction: column; gap: 6px"><label for="cm" style="font-size: 14px; font-weight: 800">پیامت</label><textarea id="cm" rows="5" required="" placeholder="هر چی که لازمه بدونیم رو بنویس…" style="width: 100%; box-sizing: border-box; border-radius: 16px; border: 1.5px solid #CFE6EF; background: #F8FDFF; padding: 12px 16px; font-size: 16px; line-height: 1.85; color: #04202E; outline: none; resize: vertical; direction: rtl"></textarea></div>
<button type="submit" style="height: 56px; border-radius: 28px; border: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; cursor: pointer">بفرست</button>
<span style="font-size: 13px; line-height: 1.8; font-weight: 500; color: #4A6572">[زمان تقریبی جواب دادن رو اینجا بنویس.]</span>
</form>
</section>

<footer style="margin-top: auto; background: #04202E; color: #fff; padding: 32px 16px 20px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import>
<span style="font-size: 14.5px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px 14px; font-size: 14.5px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="M-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="M-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="M-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="M-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<a href="M-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="M-Reviews.dc.html" style="text-decoration: none">نظرها</a>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; font-weight: 600">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
<div style="border-top: 1px solid #0E3C52; padding-top: 16px; text-align: center; font-size: 12.5px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>
<nav aria-label="ناوبری اصلی" style="position: sticky; bottom: 0; z-index: 5; margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 8px 10px 22px; display: flex; justify-content: space-between">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>شروع</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 12-نظرها.html
### TITLE: نظرها
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      bars: [
        { stars: '۵' }, { stars: '۴' }, { stars: '۳' }, { stars: '۲' }, { stars: '۱' },
      ],
      cards: [
        { stars: '★★★★★', kind: 'bear' },
        { stars: '★★★★★', kind: 'bunny' },
        { stars: '★★★★★', kind: 'cat' },
        { stars: '★★★★★', kind: 'panda' },
        { stars: '★★★★★', kind: 'sheep' },
        { stars: '★★★★★', kind: 'duck' },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 2000px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<section style="padding: 14px 16px 0; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">نظر کسایی که هدیه گرفتن</span>
<h1 style="margin: 0; font-size: 30px; line-height: 1.45; font-weight: 900">نظرها</h1>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 20px; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 700; color: #4A6572">میانگین امتیاز</span>
<span style="font-size: 38px; font-weight: 900; line-height: 1.15">[امتیاز]</span>
<span style="font-size: 13.5px; font-weight: 600; color: #4A6572">از [تعداد] نظر</span>
</div>
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 18px 16px; display: flex; flex-direction: column; gap: 12px">
<sc-for list="{{bars}}" as="b" hint-placeholder-count="5">
<div style="display: flex; align-items: center; gap: 10px">
<span style="flex: 0 0 auto; width: 58px; font-size: 13.5px; font-weight: 700">{{b.stars}} ستاره</span>
<div style="flex: 1; min-width: 0; height: 12px; border-radius: 6px; background: #E3F0F5; overflow: hidden"><div style="height: 12px; background: #00ABE7; width: 0%"></div></div>
<span style="flex: 0 0 auto; font-size: 12.5px; font-weight: 600; color: #4A6572">[درصد] · [تعداد]</span>
</div>
</sc-for>
</div>
<sc-for list="{{cards}}" as="c" hint-placeholder-count="6">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 20px; display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 13px; font-weight: 700; color: #00779F">{{c.stars}}</span>
<span style="font-size: 12.5px; font-weight: 600; color: #4A6572">[تاریخ]</span>
</div>
<div style="font-size: 16px; font-weight: 800">[عنوان نظر واقعی مشتری]</div>
<div style="font-size: 14px; line-height: 1.95; font-weight: 500; color: #1F3E4D">[متن نظر واقعی مشتری. فقط نظرهای واقعی، با اجازه‌ی خود مشتری، اینجا بیان.]</div>
<div style="margin-top: 4px; display: flex; align-items: center; gap: 10px">
<dc-import name="Plush" kind="{{c.kind}}" size="44" hint-size="44px,44px"></dc-import>
<span style="font-size: 13.5px; font-weight: 700">[اسم کوچیک]</span>
</div>
</div>
</sc-for>
<a href="M-Pick.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 15.5px; font-weight: 800; min-height: 54px; padding: 12px 20px; box-sizing: border-box; border-radius: 27px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.6">خودت هم یه نظر بذار، بعد از دریافت هدیه</a>
</section>

<footer style="margin-top: auto; background: #04202E; color: #fff; padding: 32px 16px 20px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import>
<span style="font-size: 14.5px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px 14px; font-size: 14.5px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="M-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="M-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="M-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="M-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<a href="M-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="M-Reviews.dc.html" style="text-decoration: none">نظرها</a>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; font-weight: 600">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
<div style="border-top: 1px solid #0E3C52; padding-top: 16px; text-align: center; font-size: 12.5px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>
<nav aria-label="ناوبری اصلی" style="position: sticky; bottom: 0; z-index: 5; margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 8px 10px 22px; display: flex; justify-content: space-between">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>شروع</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 13-ارسال و بازگشت.html
### TITLE: ارسال و بازگشت
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      sections: [
        { n: '۱', bg: '#CDEFFB', title: 'زمان ارسال', body: 'سفارش‌ها بعد از پرداخت حدود [تعداد] روز کاری بسته‌بندی می‌شن. بعدش برای دوستت پست می‌شه و زمان رسیدن بستگی به شهرش داره؛ [توضیح تقریبی زمان پست].' },
        { n: '۲', bg: '#FFE0EA', title: 'هزینه‌ی ارسال', body: '[هزینه‌ی ارسال و اینکه چه موقع حساب می‌شه] رو بنویس. ارسال بعد از ثبت آدرس دوستت محاسبه و نشون داده می‌شه.' },
        { n: '۳', bg: '#FFF3C9', title: 'کجا می‌فرستیم؟', body: 'فعلاً به [شهرها/کشورها] می‌فرستیم. اگه آدرس دوستت جای دیگه‌ست، از ما بپرس.' },
        { n: '۴', bg: '#E7E0FA', title: 'اگه جعبه نرسید یا آسیب دید', body: 'اگه جعبه آسیب دیده یا عروسک اشتباهی رسید، فقط کافیه ظرف [تعداد] روز از تاریخ تحویل با ما تماس بگیری و عکس بفرستی. ما جایگزین می‌فرستیم یا پولت رو برمی‌گردونیم.' },
        { n: '۵', bg: '#DDF3EA', title: 'تغییر آدرس یا لغو سفارش', body: 'تا قبل از بسته‌بندی، می‌تونی آدرس یا متن کارت رو عوض کنی یا سفارش رو لغو کنی. بعد از اون دیگه امکانش نیست، پس زودتر بهمون خبر بده.' },
      ],
    };
  }
}

### BODY:

<div style="width: 390px; min-height: 2100px; box-sizing: border-box; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; display: flex; flex-direction: column">

<div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 8px">
<a href="Main.dc.html" aria-label="برگشت" style="width: 44px; height: 44px; border-radius: 22px; background: #fff; border: 1px solid #D3E8F0; display: flex; align-items: center; justify-content: center; color: #04202E; text-decoration: none">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg>
</a>
<dc-import name="Logo" size="32" hint-size="120px,32px"></dc-import>
</div>

<section style="padding: 14px 16px 0; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">قبل از سفارش بخون</span>
<h1 style="margin: 0; font-size: 30px; line-height: 1.45; font-weight: 900">ارسال و بازگشت</h1>
<p style="margin: 0; font-size: 15px; line-height: 2; font-weight: 500; color: #1F3E4D">همه‌چی اینجا ساده و روشنه. اگه جوابت رو اینجا پیدا نکردی، از <a href="M-Contact.dc.html" style="color: #00779F; font-weight: 800">تماس با ما</a> بپرس.</p>
</div>
<sc-for list="{{sections}}" as="s" hint-placeholder-count="5">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 22px 20px; display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: center; gap: 12px"><span style="flex: 0 0 auto; width: 36px; height: 36px; border-radius: 18px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-weight: 900">{{s.n}}</span><h2 style="margin: 0; font-size: 19px; font-weight: 900">{{s.title}}</h2></div>
<div style="font-size: 14.5px; line-height: 2.05; font-weight: 500; color: #1F3E4D">{{s.body}}</div>
</div>
</sc-for>
<div style="background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 26px; padding: 18px 20px; font-size: 14px; line-height: 2; font-weight: 600">[زمان‌های ارسال، هزینه‌ی پست و شرایط بازگشت رو با اعداد واقعی خودت اینجا بنویس. عدد حدسی نذار.]</div>
</section>

<footer style="margin-top: auto; background: #04202E; color: #fff; padding: 32px 16px 20px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
<dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import>
<span style="font-size: 14.5px; font-weight: 700; color: #BFE9F8">یه بغل، تو یه جعبه</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px 14px; font-size: 14.5px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">پیشتم</span>
<a href="M-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="M-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="M-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">کمک</span>
<a href="M-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
<a href="M-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="M-Reviews.dc.html" style="text-decoration: none">نظرها</a>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; font-weight: 600">
<span style="font-size: 15px; font-weight: 800; color: #00ABE7">ما رو دنبال کن</span>
<span>[آیدی اینستاگرام]</span>
<span>[آیدی تلگرام]</span>
</div>
<div style="border-top: 1px solid #0E3C52; padding-top: 16px; text-align: center; font-size: 12.5px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>
<nav aria-label="ناوبری اصلی" style="position: sticky; bottom: 0; z-index: 5; margin-top: auto; background: rgba(255,255,255,0.96); border-top: 1px solid #D3E8F0; padding: 8px 10px 22px; display: flex; justify-content: space-between">
<a href="Main.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"></path></svg>خانه</a>
<a href="M-Pick.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>شروع</a>
<a href="M-MyGifts.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M4 7l8 6 8-6"></path></svg>هدیه‌هام</a>
<a href="M-Impact.dc.html" style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; color: #5B7482; font-size: 11px; font-weight: 700"><svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z"></path></svg>مهربونی</a>
</nav>

</div>

==========================================
### FILE: 14-دفتر مهربونی.html
### TITLE: دفتر مهربونی
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      receipts: [
        { bg: '#D6F1FB', name: 'ارسال هدیه به [نام خیریه ۱]', meta: '[تاریخ] · [تعداد] هدیه', tag: 'رسید و عکس تحویل' },
        { bg: '#FFE9F0', name: 'ارسال هدیه به [نام خیریه ۲]', meta: '[تاریخ] · [تعداد] هدیه', tag: 'رسید و عکس تحویل' },
        { bg: '#FFF3C9', name: 'ارسال هدیه به [نام خیریه ۳]', meta: '[تاریخ] · [تعداد] هدیه', tag: 'رسید و عکس تحویل' },
      ],
      steps: [
        { n: '۱', bg: '#FFE9F0', text: 'پولِ قلب‌ها و پنجه‌ها جدا از فروش جعبه‌ها نگه داشته می‌شه.' },
        { n: '۲', bg: '#D6F1FB', text: 'با پول جمع‌شده هدیه می‌خریم و خودمون به خیریه می‌رسونیم.' },
        { n: '۳', bg: '#FFF3C9', text: 'رسید، عکس و تأییدیه‌ی تحویل رو همین‌جا برات می‌ذاریم.' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 2600px; display: flex; flex-direction: column; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; box-sizing: border-box">

<header style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none; color: #00779F">دفتر مهربونی</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<main style="flex: 1 0 auto; width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 24px 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 36px">

<section style="display: flex; flex-wrap: wrap; gap: 36px; align-items: stretch">
<div style="flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 14px; justify-content: center">
<span style="font-size: 14px; font-weight: 800; color: #00779F">هر قلب و پنجه، این‌جا ثبت می‌شه</span>
<h1 style="margin: 0; font-size: 46px; line-height: 1.35; font-weight: 900">دفتر مهربونی</h1>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 500; color: #1F3E4D">هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی.</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px">
<a href="M-Extras.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 15px; font-weight: 800; height: 50px; padding: 0 22px; border-radius: 25px; display: flex; align-items: center; gap: 6px">تو هم قلب اضافه کن</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none; border: 2px solid #04202E; color: #04202E; font-size: 15px; font-weight: 800; height: 50px; box-sizing: border-box; padding: 0 22px; border-radius: 25px; display: flex; align-items: center">ارسال و بازگشت</a>
</div>
</div>

<div style="flex: 1 1 460px; min-width: 0; max-width: 560px; background: #04202E; color: #fff; border-radius: 32px; padding: 30px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px">
<div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap">
<span style="font-size: 16px; font-weight: 800; color: #BFE9F8">اولین بسته‌ی خیریه</span>
<span style="font-size: 13px; font-weight: 700; color: #BFE9F8">در حال جمع شدن</span>
</div>
<div style="display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap">
<span style="font-size: 56px; line-height: 1.1; font-weight: 900; color: #00ABE7">[عدد]</span>
<span style="font-size: 19px; font-weight: 700">از [هدف] هدیه</span>
</div>
<div style="height: 16px; border-radius: 8px; background: #0E3C52; overflow: hidden">
<div style="height: 16px; border-radius: 8px; background: #00ABE7; width: 50%"></div>
</div>
<span style="font-size: 13.5px; line-height: 1.9; font-weight: 500; color: #D3EEF9">[درصد پیشرفت] · نوار بالا فقط نمونه‌ست و با داده‌ی واقعی پر می‌شه. وقتی به [هدف] تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم. بعدش رسید و عکس تحویلش رو همین پایین می‌بینی.</span>
</div>
</section>

<section style="display: flex; flex-wrap: wrap; gap: 16px">
<div style="flex: 1 1 220px; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 600; color: #4A6572">هدیه‌های فرستاده‌شده</span>
<span style="font-size: 36px; font-weight: 900">[عدد]</span>
</div>
<div style="flex: 1 1 220px; background: #FFE9F0; border: 1px solid #F7C5D3; border-radius: 24px; padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 600; color: #4A6572">قلب‌های ثبت‌شده</span>
<span style="font-size: 36px; font-weight: 900">[عدد]</span>
</div>
<div style="flex: 1 1 220px; background: #FFF3C9; border: 1px solid #F2E3A0; border-radius: 24px; padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 600; color: #4A6572">پنجه‌های ثبت‌شده</span>
<span style="font-size: 36px; font-weight: 900">[عدد]</span>
</div>
<div style="flex: 1 1 220px; background: #DDF3EA; border: 1px solid #BFE5D3; border-radius: 24px; padding: 22px 24px; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 14px; font-weight: 600; color: #4A6572">خیریه‌های همکار</span>
<span style="font-size: 36px; font-weight: 900">[عدد]</span>
</div>
</section>

<section style="display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start">

<div style="flex: 1.4 1 540px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<h2 style="margin: 0; font-size: 26px; font-weight: 900">مدارک ارسال</h2>
<sc-for list="{{receipts}}" as="r" hint-placeholder-count="3">
<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 18px 20px; display: flex; align-items: center; gap: 16px">
<div style="flex: 0 0 auto; width: 60px; height: 68px; border-radius: 14px; background: {{r.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v4h4M10 12h5M10 16h5"></path></svg>
</div>
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px">
<span style="font-size: 16px; font-weight: 800">{{r.name}}</span>
<span style="font-size: 13px; font-weight: 500; color: #4A6572">{{r.meta}}</span>
<span style="align-self: flex-start; background: #D6F1FB; font-size: 12.5px; font-weight: 700; padding: 4px 10px; border-radius: 10px">{{r.tag}}</span>
</div>
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="#5B7482" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg>
</div>
</sc-for>
<div style="border: 2px dashed #99D6EE; border-radius: 26px; padding: 20px; display: flex; align-items: center; gap: 16px">
<div style="flex: 0 0 auto; width: 60px; height: 60px; border-radius: 30px; background: #E3F6FD; display: flex; align-items: center; justify-content: center">
<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="none" stroke="#00779F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z"></path></svg>
</div>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-size: 16px; font-weight: 800">ارسال بعدی</span>
<span style="font-size: 13.5px; line-height: 1.8; font-weight: 500; color: #4A6572">وقتی بسته‌ی جاری کامل شد، مدرکش همین‌جا اضافه می‌شه.</span>
</div>
</div>
</div>

<div style="flex: 1 1 340px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<h2 style="margin: 0; font-size: 26px; font-weight: 900">چطوری شفاف می‌مونیم؟</h2>
<sc-for list="{{steps}}" as="s" hint-placeholder-count="3">
<div style="display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid #DDEEF5; border-radius: 24px; padding: 18px 20px">
<div style="flex: 0 0 auto; width: 42px; height: 42px; border-radius: 21px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 900">{{s.n}}</div>
<span style="font-size: 15px; line-height: 1.9; font-weight: 600; color: #1F3E4D">{{s.text}}</span>
</div>
</sc-for>
<div style="margin-top: 6px; background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 24px; padding: 18px 20px; font-size: 14px; line-height: 1.9; font-weight: 600">[هر بسته‌ی جمع‌شده رو با تاریخ و تعداد واقعی اینجا ثبت کن. عدد حدسی نذار.]</div>
</div>

</section>
</main>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 15-ورود یا ثبت‌نام.html
### TITLE: ورود یا ثبت‌نام
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    const signup = (this.props.mode ?? 'login') === 'signup';
    return {
      title: signup ? 'بیا عضو شو' : 'خوش اومدی',
      subtitle: signup ? 'با شماره‌ت حساب بساز تا هدیه‌هات رو همیشه ببینی.' : 'با شماره‌ت وارد شو تا هدیه‌هات رو ببینی.',
    };
  }
}

### BODY:

<div style="min-height: 1000px; display: flex; flex-direction: column; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; box-sizing: border-box">

<header style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<main style="flex: 1 0 auto; width: 100%; max-width: 1080px; margin: 0 auto; padding: 40px 24px 56px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px; align-items: stretch; justify-content: center">

<div style="flex: 1 1 460px; min-width: 0; max-width: 560px; position: relative; overflow: hidden; background: #00ABE7; border-radius: 40px; padding: 48px 44px; box-sizing: border-box; min-height: 520px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px">
<div style="position: absolute; left: -90px; bottom: -110px; width: 320px; height: 320px; border-radius: 160px; background: #66CDF1"></div>
<span style="position: absolute; top: 60px; left: 56px; width: 14px; height: 14px; border-radius: 7px; background: #fff"></span>
<span style="position: absolute; top: 120px; right: 60px; width: 16px; height: 6px; border-radius: 3px; background: #04202E; transform: rotate(35deg)"></span>
<span style="position: absolute; top: 200px; left: 40px; width: 14px; height: 14px; border-radius: 7px; background: #FFE08A; border: 2px solid #04202E; box-sizing: border-box"></span>
<div style="position: relative; display: flex; flex-direction: column; gap: 14px">
<dc-import name="Logo" size="44" hint-size="150px,44px"></dc-import>
<h2 style="margin: 16px 0 0; font-size: 38px; line-height: 1.5; font-weight: 900">یه بغل، تو یه جعبه</h2>
<p style="margin: 0; font-size: 16px; line-height: 2; font-weight: 600; color: #04202E">هدیه‌هات رو از همین‌جا بفرست، پیام‌هات رو ببین و هر قلب و پنجه‌ای که جمع می‌شه رو یه جا نگه دار.</p>
</div>
<div style="position: relative; display: flex; align-items: flex-end; gap: 14px">
<dc-import name="Plush" kind="bunny" size="200" hint-size="200px,200px"></dc-import>
<dc-import name="Plush" kind="panda" size="140" hint-size="140px,140px"></dc-import>
</div>
</div>

<div style="flex: 1 1 380px; min-width: 0; max-width: 460px; background: #fff; border: 1px solid #DDEEF5; border-radius: 32px; padding: 40px 36px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; align-self: center">
<a href="Desktop-Home.dc.html" style="text-decoration: none; font-size: 14px; font-weight: 800; color: #00779F">برگرد به خانه</a>
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px">
<h1 style="margin: 0; font-size: 32px; line-height: 1.45; font-weight: 900">{{title}}</h1>
<p style="margin: 0; font-size: 15px; line-height: 1.9; font-weight: 500; color: #1F3E4D">{{subtitle}}</p>
</div>
<div style="margin-top: 14px; display: flex; flex-direction: column; gap: 12px">
<label for="phone" style="font-size: 14px; font-weight: 800">شماره‌ی موبایلت</label>
<input id="phone" type="tel" inputmode="numeric" placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" style="height: 58px; box-sizing: border-box; border-radius: 20px; border: 2px solid #04202E; background: #fff; padding: 0 18px; font-size: 18px; font-weight: 600; color: #04202E; outline: none; direction: ltr; text-align: right">
<button type="button" style="height: 56px; border-radius: 28px; border: none; background: #00ABE7; color: #04202E; font-size: 17px; font-weight: 800; cursor: pointer">ادامه</button>
</div>
<div style="margin-top: 6px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #4A6572">
<span style="flex: 1; height: 1.5px; background: #CFE6EF"></span>یا<span style="flex: 1; height: 1.5px; background: #CFE6EF"></span>
</div>
<button type="button" style="height: 52px; border-radius: 26px; border: 2px solid #04202E; background: transparent; color: #04202E; font-size: 15px; font-weight: 800; cursor: pointer">ادامه با ایمیل</button>
<div style="margin-top: 8px; font-size: 12.5px; line-height: 1.9; font-weight: 500; color: #4A6572; text-align: center">با ادامه، <span style="color: #00779F; font-weight: 800">قوانین و حریم خصوصی</span> رو قبول می‌کنی.</div>
</div>

</main>

<footer style="margin-top: 40px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 16-هدیه‌هام.html
### TITLE: هدیه‌هام
### SCRIPT:

class Component extends DCLogic {
  state = { tab: 'sent' };
  renderVals() {
    const fa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    const tab = this.state.tab;
    const sent = [
      { kind: 'bear', bg: '#FFE8D1', who: 'برای نازنین', no: fa(101), date: '[تاریخ]', extra: 'ناشناس', status: 'در راه', statusBg: '#CDEFFB' },
      { kind: 'bunny', bg: '#FFE0EA', who: 'برای مریم', no: fa(107), date: '[تاریخ]', extra: '[عدد] قلب', status: 'تحویل شد', statusBg: '#D7F5E4' },
      { kind: 'cat', bg: '#E7E0FA', who: 'برای مامان', no: fa(112), date: '[تاریخ]', extra: '[عدد] پنجه', status: 'بسته‌بندی', statusBg: '#FFF3C9' },
    ];
    const recv = [
      { kind: 'panda', bg: '#DDF3EA', who: 'از یه دوست ناشناس', no: fa(98), date: '[تاریخ]', extra: 'کارت باز شده', status: 'پیام رو دیدی', statusBg: '#D7F5E4' },
    ];
    const items = tab === 'sent' ? sent : recv;
    return {
      sentOn: tab === 'sent',
      recvOn: tab === 'recv',
      sentBg: tab === 'sent' ? '#fff' : 'transparent',
      recvBg: tab === 'recv' ? '#fff' : 'transparent',
      showSent: () => this.setState({ tab: 'sent' }),
      showRecv: () => this.setState({ tab: 'recv' }),
      items,
      count: fa(items.length),
    };
  }
}

### BODY:

<div style="min-height: 1800px; display: flex; flex-direction: column; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; box-sizing: border-box">

<header style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<main style="flex: 1 0 auto; width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 24px 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">

<section style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 14px; font-weight: 800; color: #00779F">حساب تو</span>
<h1 style="margin: 0; font-size: 44px; line-height: 1.35; font-weight: 900">هدیه‌هام</h1>
</div>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 15px; font-weight: 800; height: 50px; padding: 0 24px; border-radius: 25px; display: flex; align-items: center">+ هدیه‌ی جدید</a>
</section>

<section style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center">
<div style="display: flex; gap: 6px; background: #E3F0F5; border-radius: 22px; padding: 5px; width: 380px; max-width: 100%; box-sizing: border-box">
<button type="button" aria-pressed="{{sentOn}}" sc-camel-on-click="{{showSent}}" style="flex: 1; height: 44px; border: none; border-radius: 17px; cursor: pointer; font-size: 15px; font-weight: 800; background: {{sentBg}}; color: #04202E">فرستاده‌ها</button>
<button type="button" aria-pressed="{{recvOn}}" sc-camel-on-click="{{showRecv}}" style="flex: 1; height: 44px; border: none; border-radius: 17px; cursor: pointer; font-size: 15px; font-weight: 800; background: {{recvBg}}; color: #04202E">دریافتی‌ها</button>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-inline-start: auto">
<div style="min-width: 190px; background: #fff; border: 1px solid #DDEEF5; border-radius: 22px; padding: 14px 18px; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 13px; font-weight: 600; color: #4A6572">تعداد هدیه‌ها</span>
<span style="font-size: 26px; font-weight: 900">{{count}}</span>
</div>
<div style="min-width: 190px; background: #FFE9F0; border: 1px solid #F7C5D3; border-radius: 22px; padding: 14px 18px; display: flex; flex-direction: column; gap: 2px">
<span style="font-size: 13px; font-weight: 600; color: #4A6572">قلب و پنجه‌ی تو</span>
<span style="font-size: 26px; font-weight: 900">[عدد]</span>
</div>
</div>
</section>

<section style="background: #FFF8E0; border: 1px solid #F2E3A0; border-radius: 22px; padding: 14px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; line-height: 1.9; font-weight: 600">
<span style="flex: 0 0 auto; background: #04202E; color: #fff; font-size: 12.5px; font-weight: 800; padding: 4px 12px; border-radius: 12px">[نمونه]</span>
<span>ردیف‌های زیر فقط نمونه‌ان و با هدیه‌های واقعی عوض می‌شن. وقتی هدیه‌ای نداشته باشی، همین‌جا یه حالت خالی نشون داده می‌شه.</span>
</section>

<section style="display: flex; flex-wrap: wrap; gap: 18px">
<sc-for list="{{items}}" as="g" hint-placeholder-count="3">
<div style="flex: 1 1 340px; max-width: 400px; min-width: 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 20px; display: flex; gap: 18px; align-items: center; box-sizing: border-box">
<div style="flex: 0 0 auto; width: 88px; height: 88px; border-radius: 22px; background: {{g.bg}}; display: flex; align-items: center; justify-content: center">
<dc-import name="Plush" kind="{{g.kind}}" size="66" hint-size="66px,66px"></dc-import>
</div>
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
<span style="font-size: 16px; font-weight: 800">{{g.who}}</span>
<span style="background: #04202E; color: #fff; font-size: 12.5px; font-weight: 800; padding: 3px 10px; border-radius: 12px">{{g.no}}</span>
</div>
<span style="font-size: 13px; font-weight: 500; color: #4A6572">{{g.date}} · {{g.extra}}</span>
<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap">
<span style="background: {{g.statusBg}}; font-size: 12.5px; font-weight: 700; padding: 4px 10px; border-radius: 10px">{{g.status}}</span>
<span style="background: #F2F7F9; font-size: 11.5px; font-weight: 800; padding: 3px 8px; border-radius: 10px; color: #4A6572">[نمونه]</span>
</div>
</div>
</div>
</sc-for>
</section>

<section style="margin-top: 8px; border: 2px dashed #99D6EE; border-radius: 28px; padding: 22px 26px; display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
<svg width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<span style="flex: 1 1 420px; font-size: 15px; line-height: 1.9; font-weight: 600; color: #1F3E4D">برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن.</span>
<a href="Desktop-Impact.dc.html" style="text-decoration: none; border: 2px solid #04202E; color: #04202E; font-size: 15px; font-weight: 800; height: 48px; padding: 0 22px; box-sizing: border-box; border-radius: 24px; display: flex; align-items: center">برو به دفتر مهربونی</a>
</section>

</main>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 17-سفارش ثبت شد.html
### TITLE: سفارش ثبت شد
### SCRIPT:

class Component extends DCLogic {
  renderVals() {
    return {
      steps: [
        { n: '۱', bg: '#CDEFFB', title: 'پرداخت شد', sub: 'همین حالا' },
        { n: '۲', bg: '#FFE0EA', title: 'بسته‌بندی', sub: 'حدود [تعداد] روز کاری' },
        { n: '۳', bg: '#FFF3C9', title: 'تحویل پست', sub: 'کد رهگیری رو بعداً برات می‌فرستیم' },
        { n: '۴', bg: '#E7E0FA', title: 'رسیدن به دوستت', sub: 'با کارت QR و شماره‌ی [شماره‌ی هدیه]' },
      ],
    };
  }
}

### BODY:

<div style="min-height: 1400px; display: flex; flex-direction: column; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; box-sizing: border-box">

<header style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px 28px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<nav aria-label="منوی اصلی" style="display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 15px; font-weight: 700">
<a href="Desktop-Home.dc.html" style="text-decoration: none">خانه</a>
<a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a>
<a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a>
<a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a>
<a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a>
<a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a>
<a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a>
</nav>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; background: #04202E; color: #fff; font-size: 15px; font-weight: 800; height: 48px; padding: 0 24px; border-radius: 24px; display: flex; align-items: center">بساز و بفرست</a>
</header>

<main style="flex: 1 0 auto; width: 100%; max-width: 1200px; margin: 0 auto; padding: 24px 24px 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">

<section style="position: relative; background: #00ABE7; border-radius: 40px; padding: 44px 48px; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: column; gap: 22px">
<div style="position: absolute; left: -80px; bottom: -120px; width: 300px; height: 300px; border-radius: 150px; background: #66CDF1"></div>
<div style="position: relative; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px">
<span style="background: #fff; border: 2px solid #04202E; border-radius: 14px; padding: 6px 14px; font-size: 14px; font-weight: 800">شماره‌ی سفارش: [شماره‌ی سفارش]</span>
</div>
<div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; padding: 12px 0 8px">
<span style="width: 84px; height: 84px; border-radius: 42px; background: #fff; border: 3px solid #04202E; display: flex; align-items: center; justify-content: center">
<svg width="40" height="40" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>
</span>
<h1 style="margin: 0; font-size: 40px; line-height: 1.5; font-weight: 900">سفارشت ثبت شد!</h1>
<p style="margin: 0; font-size: 17px; line-height: 1.9; font-weight: 600">هدیه‌ی شماره‌ی <b>[شماره‌ی هدیه]</b> داره آماده می‌شه.</p>
</div>
</section>

<section style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start">

<div style="flex: 1.1 1 480px; min-width: 0; background: #fff; border: 1px solid #DDEEF5; border-radius: 28px; padding: 28px; box-sizing: border-box; display: flex; flex-direction: column; gap: 18px">
<div style="font-size: 20px; font-weight: 900">مسیر هدیه تا دست دوستت</div>
<sc-for list="{{steps}}" as="s" hint-placeholder-count="4">
<div style="display: flex; gap: 16px; align-items: flex-start">
<div style="display: flex; flex-direction: column; align-items: center">
<span style="width: 36px; height: 36px; border-radius: 18px; background: {{s.bg}}; border: 2px solid #04202E; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 900">{{s.n}}</span>
<span style="width: 2px; height: 26px; background: #CFE6EF"></span>
</div>
<div style="display: flex; flex-direction: column; gap: 3px; padding-top: 5px">
<span style="font-size: 16px; font-weight: 800">{{s.title}}</span>
<span style="font-size: 13.5px; font-weight: 500; color: #4A6572">{{s.sub}}</span>
</div>
</div>
</sc-for>
</div>

<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 18px">
<div style="background: #04202E; color: #fff; border-radius: 28px; padding: 24px; display: flex; flex-wrap: wrap; align-items: center; gap: 20px; box-sizing: border-box">
<div style="flex: 0 0 auto; width: 150px; height: 150px; border-radius: 18px; background: #fff; display: flex; align-items: center; justify-content: center">
<svg width="120" height="120" sc-camel-view-box="0 0 25 25" aria-hidden="true"><g fill="#04202E"><path fill-rule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="20" y="2" width="3" height="3"></rect><path fill-rule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z"></path><rect x="2" y="20" width="3" height="3"></rect><rect x="9" y="0" width="2" height="2"></rect><rect x="12" y="2" width="2" height="2"></rect><rect x="9" y="5" width="3" height="2"></rect><rect x="14" y="6" width="2" height="2"></rect><rect x="0" y="9" width="2" height="2"></rect><rect x="4" y="10" width="3" height="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="13" y="10" width="3" height="3"></rect><rect x="18" y="9" width="2" height="2"></rect><rect x="22" y="11" width="3" height="2"></rect><rect x="2" y="13" width="2" height="2"></rect><rect x="7" y="14" width="2" height="3"></rect><rect x="11" y="14" width="2" height="2"></rect><rect x="16" y="15" width="3" height="2"></rect><rect x="21" y="15" width="2" height="2"></rect><rect x="9" y="18" width="3" height="2"></rect><rect x="14" y="19" width="2" height="3"></rect><rect x="18" y="20" width="2" height="2"></rect><rect x="22" y="21" width="3" height="2"></rect><rect x="10" y="22" width="2" height="3"></rect></g></svg>
</div>
<div style="flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 8px">
<span style="font-size: 18px; font-weight: 900">کارت پستالت آماده‌ست</span>
<span style="font-size: 13.5px; line-height: 1.9; font-weight: 500; color: #D3EEF9">رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه.</span>
<span style="font-size: 12px; font-weight: 700; color: #BFE9F8">[کد QR واقعی اینجا میاد]</span>
</div>
</div>

<div style="background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 24px; padding: 18px 20px; display: flex; align-items: center; gap: 14px">
<svg width="34" height="34" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<div style="font-size: 14.5px; line-height: 1.9; font-weight: 600">با این سفارش [عدد] قلب و [عدد] پنجه هم برای بچه‌های بی‌سرپرست و حیوونا ثبت شد. رسیدش تو <a href="Desktop-Impact.dc.html" style="color: #00779F; font-weight: 800">دفتر مهربونی</a> می‌مونه.</div>
</div>
</div>

</section>

<section style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; padding: 8px 0 0">
<a href="Desktop-MyGifts.dc.html" style="text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 30px; border-radius: 27px; display: flex; align-items: center; justify-content: center">هدیه‌هام رو ببین</a>
<a href="Desktop-Builder.dc.html" style="text-decoration: none; border: 2px solid #04202E; color: #04202E; font-size: 16px; font-weight: 800; height: 54px; padding: 0 30px; box-sizing: border-box; border-radius: 27px; display: flex; align-items: center; justify-content: center">ساخت هدیه‌ی دیگه</a>
<a href="Desktop-Home.dc.html" style="text-decoration: none; color: #00779F; font-size: 15px; font-weight: 800; height: 54px; padding: 0 16px; display: flex; align-items: center">برگرد به خانه</a>
</section>

</main>

<footer style="margin-top: 96px; background: #04202E; color: #fff">
<div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px 36px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 32px 60px; justify-content: space-between; font-size: 15px; font-weight: 600">
<div style="display: flex; flex-direction: column; gap: 12px"><dc-import name="Logo" size="40" hint-size="130px,40px"></dc-import><span style="color: #BFE9F8">یه بغل، تو یه جعبه</span></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">پیشتم</span><a href="Desktop-Mission.dc.html" style="text-decoration: none">ماموریت</a><a href="Desktop-About.dc.html" style="text-decoration: none">درباره‌ی ما</a><a href="Desktop-Impact.dc.html" style="text-decoration: none">دفتر مهربونی</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">کمک</span><a href="Desktop-Contact.dc.html" style="text-decoration: none">تماس با ما</a><a href="Desktop-Shipping.dc.html" style="text-decoration: none">ارسال و بازگشت</a><a href="Desktop-Reviews.dc.html" style="text-decoration: none">نظرها</a></div>
<div style="display: flex; flex-direction: column; gap: 10px"><span style="color: #00ABE7; font-weight: 800">ما رو دنبال کن</span><span>[آیدی اینستاگرام]</span><span>[آیدی تلگرام]</span></div>
</div>
<div style="border-top: 1px solid #0E3C52; padding: 18px 24px; text-align: center; font-size: 13px; font-weight: 500; color: #BFE9F8">پیشتم · همه‌ی حقوق محفوظ است</div>
</footer>

</div>

==========================================
### FILE: 18-پیام تو.html
### TITLE: پیام تو
### SCRIPT:

class Component extends DCLogic {
  state = { open: false, show: false };

  // [رمز عبور] placeholder: no real password is stored or compared here.
  // Replace with a real check (server-side) when the recipient flow is wired up.
  checkPassword(value) {
    return false;
  }

  renderVals() {
    const isOpen = this.state.open || this.props.openPreview === 'open';
    const unlock = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const el = typeof document !== 'undefined' ? document.getElementById('gp') : null;
      const value = el ? el.value : '';
      if (this.checkPassword(value)) this.setState({ open: true });
    };
    return {
      isOpen,
      leftTitle: isOpen ? 'هدیه‌ت باز شد' : 'یکی برات یه چیزی فرستاده',
      lockDisp: isOpen ? 'none' : 'flex',
      lockedCardDisp: isOpen ? 'none' : 'flex',
      openCardDisp: isOpen ? 'flex' : 'none',
      ptype: this.state.show ? 'text' : 'password',
      toggle: () => this.setState({ show: !this.state.show }),
      unlock,
      sender: this.props.sender ?? 'یه دوست ناشناس',
    };
  }
}

### BODY:

<div style="min-height: 1400px; display: flex; flex-direction: column; background: #F2FAFD; color: #04202E; font-family: 'Vazirmatn', system-ui, sans-serif; direction: rtl; box-sizing: border-box">

<header style="max-width: 1200px; width: 100%; margin: 0 auto; padding: 18px 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a href="Desktop-Home.dc.html" style="text-decoration: none"><dc-import name="Logo" size="46" hint-size="150px,46px"></dc-import></a>
<a href="Desktop-Home.dc.html" style="text-decoration: none; font-size: 15px; font-weight: 800; color: #00779F">برو به خانه</a>
</header>

<main style="flex: 1 0 auto; width: 100%; max-width: 1200px; margin: 0 auto; padding: 16px 24px 0; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 28px; align-items: stretch">

<section style="flex: 1 1 460px; min-width: 0; position: relative; overflow: hidden; background: #00ABE7; border-radius: 40px; padding: 48px; box-sizing: border-box; display: flex; flex-direction: column; gap: 24px; min-height: 640px">
<div style="position: absolute; left: -120px; bottom: -150px; width: 380px; height: 380px; border-radius: 190px; background: #66CDF1"></div>
<span style="position: absolute; top: 90px; left: 50px; width: 14px; height: 14px; border-radius: 7px; background: #fff"></span>
<span style="position: absolute; top: 60px; right: 120px; width: 18px; height: 6px; border-radius: 3px; background: #fff; transform: rotate(-30deg)"></span>

<div style="position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap">
<span style="font-size: 14px; font-weight: 800; color: #04202E">پیشتم · یه بغل، تو یه جعبه</span>
<div style="background: #fff; border: 2.5px solid #04202E; border-radius: 14px; padding: 6px 14px 4px; text-align: center; transform: rotate(3deg)">
<div style="font-size: 11px; font-weight: 700; color: #4A6572">هدیه‌ی شماره</div>
<div style="font-size: 22px; font-weight: 900; line-height: 1.2">[شماره‌ی هدیه]</div>
</div>
</div>

<div style="position: relative; align-self: center; width: 300px; height: 300px; flex: 0 0 auto">
<div style="position: absolute; inset: 0; border-radius: 150px; background: #66CDF1"></div>
<div style="position: absolute; left: 36px; top: 42px">
<dc-import name="Plush" kind="bunny" size="228" hint-size="228px,228px"></dc-import>
</div>
<svg style="position: absolute; top: 18px; right: 28px" width="32" height="32" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#fff" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round" transform="rotate(12)"></path></svg>
<svg style="position: absolute; top: 84px; left: 6px" width="22" height="22" sc-camel-view-box="-17 -17 34 34" aria-hidden="true"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round" transform="rotate(-14)"></path></svg>
</div>

<div style="position: relative; display: flex; flex-direction: column; gap: 10px; text-align: center">
<h1 style="margin: 0; font-size: 34px; line-height: 1.5; font-weight: 900">{{leftTitle}}</h1>
<p style="margin: 0; font-size: 16px; line-height: 1.9; font-weight: 500; color: #04202E; display: {{lockDisp}}">رمزی که فرستنده بهت داده رو بزن تا پیامت باز بشه.</p>
</div>

<form sc-camel-on-submit="{{unlock}}" style="position: relative; display: {{lockDisp}}; flex-direction: column; gap: 14px">
<label for="gp" style="font-size: 14px; font-weight: 800">رمز کارت</label>
<div style="position: relative">
<input id="gp" type="{{ptype}}" placeholder="رمز کارت" autocomplete="off" style="width: 100%; box-sizing: border-box; height: 62px; border-radius: 22px; border: 3px solid #04202E; background: #fff; padding: 0 22px 0 60px; font-size: 18px; font-weight: 600; color: #04202E; outline: none; direction: rtl">
<button type="button" aria-label="نمایش یا پنهان کردن رمز" sc-camel-on-click="{{toggle}}" style="position: absolute; left: 9px; top: 9px; width: 44px; height: 44px; border-radius: 16px; border: none; background: #E3F6FD; cursor: pointer; display: flex; align-items: center; justify-content: center">
<svg width="22" height="22" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
</button>
</div>
<button type="submit" style="height: 58px; border-radius: 29px; border: none; background: #04202E; color: #fff; font-size: 17px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px">باز کن</button>
<div style="background: rgba(255,255,255,0.55); border-radius: 16px; padding: 10px 14px; font-size: 12.5px; line-height: 1.8; font-weight: 600">[رمز عبور: بررسی واقعی رمز هنوز وصل نشده. فعلاً هیچ رمزی ذخیره یا مقایسه نمی‌شه.]</div>
<div style="text-align: center; font-size: 14px; font-weight: 700">رمز رو نمی‌دونی؟ از کسی که فرستاده بپرس.</div>
</form>
</section>

<section style="flex: 1.2 1 560px; min-width: 0; box-sizing: border-box; display: flex; flex-direction: column; gap: 18px">

<div style="display: {{lockedCardDisp}}; flex: 1; min-height: 640px; border: 2px dashed #99D6EE; border-radius: 40px; background: #fff; padding: 48px; box-sizing: border-box; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center">
<span style="width: 84px; height: 84px; border-radius: 42px; background: #04202E; display: flex; align-items: center; justify-content: center">
<svg width="36" height="36" sc-camel-view-box="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.5"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>
</span>
<h2 style="margin: 0; font-size: 26px; font-weight: 900">پیامت بعد از باز کردن رمز اینجا میاد</h2>
<p style="margin: 0; max-width: 420px; font-size: 15px; line-height: 1.9; font-weight: 500; color: #4A6572">متن، عکس و ویدیوی فرستنده همین‌جا نشون داده می‌شه.</p>
</div>

<div style="display: {{openCardDisp}}; flex-direction: column; gap: 18px">
<div style="position: relative; background: #04202E; color: #fff; border-radius: 36px; padding: 32px; overflow: hidden; display: flex; flex-direction: column; gap: 10px">
<span style="align-self: flex-start; background: #00ABE7; color: #04202E; font-size: 13px; font-weight: 800; padding: 6px 14px; border-radius: 14px">از طرف {{sender}}</span>
<h2 style="margin: 4px 0 0; font-size: 36px; line-height: 1.4; font-weight: 900">یه بغل برات رسید</h2>
<span style="font-size: 13px; font-weight: 600; color: #BFE9F8">[متن نمونه] همین‌جا می‌تونه متن واقعی فرستنده باشه.</span>
</div>

<div style="background: #fff; border: 1px solid #DDEEF5; border-radius: 30px; padding: 26px 28px; display: flex; flex-direction: column; gap: 12px; box-sizing: border-box">
<div style="display: flex; align-items: center; justify-content: space-between">
<span style="font-size: 14px; font-weight: 800; color: #00779F">پیام برای تو</span>
<span style="background: #D6F1FB; font-size: 12.5px; font-weight: 700; padding: 5px 12px; border-radius: 12px">دلم تنگ شده</span>
</div>
<p style="margin: 0; font-size: 18px; line-height: 2.1; font-weight: 500">عزیزم، دلم برات خیلی تنگ شده بود. گفتم تا وقتی دوباره ببینمت، این دوست پشمالو جام رو پیشت بگیره. هر وقت دلت گرفت، بغلش کن و بدون که منم همین‌جام.</p>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 16px">
<div style="flex: 1 1 220px; background: #fff; border: 1px solid #DDEEF5; border-radius: 26px; padding: 12px 12px 10px; transform: rotate(-2deg); box-sizing: border-box">
<svg sc-camel-view-box="0 0 140 112" width="100%" role="img" aria-label="عکس فرستنده" style="display: block; border-radius: 16px; background: #BFE9F8">
<circle cx="104" cy="30" r="15" fill="#FFE08A"></circle>
<path d="M0 86C26 56 50 56 76 80S120 92 140 76V112H0z" fill="#FFB3C6"></path>
<path d="M0 98C30 78 60 82 90 96 110 104 126 100 140 94V112H0z" fill="#00ABE7"></path>
<path transform="translate(40 52) scale(.9)" d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="3" stroke-linejoin="round"></path>
</svg>
<div style="font-size: 13px; font-weight: 700; text-align: center; padding-top: 10px">عکس فرستنده</div>
</div>
<button type="button" aria-label="پخش ویدیو" style="flex: 1 1 220px; position: relative; min-height: 190px; border: none; cursor: pointer; border-radius: 26px; background: #04202E; padding: 0; overflow: hidden">
<span style="position: absolute; left: -20px; bottom: -30px; width: 130px; height: 130px; border-radius: 65px; background: #0A3B52"></span>
<span style="position: absolute; top: 50%; left: 50%; margin: -30px 0 0 -30px; width: 60px; height: 60px; border-radius: 30px; background: #00ABE7; display: flex; align-items: center; justify-content: center">
<svg width="24" height="24" sc-camel-view-box="0 0 24 24" fill="#04202E" aria-hidden="true"><path d="M8 5l11 7-11 7z"></path></svg>
</span>
<span style="position: absolute; bottom: 14px; right: 16px; color: #fff; font-size: 13px; font-weight: 700">ویدیوی فرستنده</span>
</button>
</div>

<div style="background: #FFE9F0; border: 1.5px solid #F7C5D3; border-radius: 26px; padding: 18px 20px; display: flex; align-items: center; gap: 14px">
<svg width="40" height="40" sc-camel-view-box="-17 -17 34 34" aria-hidden="true" style="flex: 0 0 auto"><path d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z" fill="#F0426B" stroke="#04202E" stroke-width="2.4" stroke-linejoin="round"></path></svg>
<div style="font-size: 14.5px; line-height: 1.9; font-weight: 600; color: #1F3E4D">فرستنده‌ت با <b style="color: #04202E">[عدد] قلب</b> و <b style="color: #04202E">[عدد] پنجه</b> به بچه‌های بی‌سرپرست و حیوونا هدیه داده. این هدیه، مهربونی رو دو برابر کرد.</div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="Desktop-Builder.dc.html" style="flex: 1 1 240px; text-decoration: none; background: #00ABE7; color: #04202E; font-size: 16px; font-weight: 800; height: 56px; border-radius: 28px; display: flex; align-items: center; justify-content: center; gap: 8px; box-sizing: border-box">تو هم برای یکی بفرست
<svg width="18" height="18" sc-camel-view-box="0 0 24 24" fill="none" stroke="#04202E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></a>
<button type="button" style="flex: 1 1 240px; height: 56px; border-radius: 28px; border: 2px solid #04202E; background: transparent; color: #04202E; font-size: 15px; font-weight: 800; cursor: pointer">یه قلب برای فرستنده بفرست</button>
</div>
</div>

</section>

</main>

<footer style="margin-top: 40px; padding: 18px 24px 28px; text-align: center; font-size: 13px; font-weight: 700; color: #4A6572">پیشتم · یه بغل، تو یه جعبه</footer>

</div>
