import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'من نحن - العلم في حكاية',
  description: 'تعرف على قصة العلم في حكاية ورسالتنا في تبسيط العلوم وسرد التاريخ بطريقة ممتعة.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <article className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)', textShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}>
            من نحن – العلم في حكاية
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', fontStyle: 'italic' }}>
            حيث تتحول المعرفة إلى رحلة ممتعة!
          </p>
        </header>

        <section style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p>
            في <strong>"العلم في حكاية"</strong>، نؤمن أن المعرفة الحقيقية لا ينبغي أن تظل حبيسة الكتب المعقدة أو مقتصرة على الأروقة الأكاديمية. لذلك، أخذنا على عاتقنا مهمة تبسيط العلوم وسرد التاريخ بطريقة تأسر العقل والوجدان، لنحول الحقائق العلمية المجردة والأحداث التاريخية العميقة إلى قصص مشوقة، ونثبت أن التعلم يمكن أن يكون تجربة ممتعة ومثيرة للجميع.
          </p>
        </section>

        <section>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem' }}>
            ماذا نقدم؟
          </h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1rem' }}>
            نحن لسنا مجرد منصة للمعلومات، بل نحن نافذتك لاستكشاف العالم من زوايا جديدة. من خلال دمج الكلمة المكتوبة مع المحتوى البصري المتقن في فيديوهاتنا، نغوص معاً في أعماق مجالات متنوعة تشمل:
          </p>
          <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li className="glass-panel" style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <strong>🌌 الكون والفضاء:</strong> نستكشف الثقوب السوداء، النجوم، وأعظم أسرار الفضاء الخارجي.
            </li>
            <li className="glass-panel" style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary)' }}>
              <strong>🏛️ التاريخ والتحقيقات:</strong> نفك طلاسم الحضارات القديمة، ونعيد فتح ملفات الألغاز الكبرى والتحقيقات التي حيرت العالم.
            </li>
            <li className="glass-panel" style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <strong>🧠 علم النفس والصحة:</strong> نفهم خبايا العقل البشري، ونستعرض أعقد الاضطرابات النفسية وكيفية عمل أجسادنا بأسلوب علمي مبسط.
            </li>
            <li className="glass-panel" style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <strong>🕵️ عالم الجواسيس والغموض:</strong> نسرد قصصاً واقعية تحبس الأنفاس فاقت في إثارتها الخيال السينمائي.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem' }}>
            منهجنا
          </h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            الدقة والمصداقية هما أساس عملنا. نحن ندمج بين البحث العلمي الرصين والأسلوب القصصي الجذاب، معتمدين على أحدث تقنيات العرض البصري وصناعة المحتوى لتقديم مقالات وحلقات تليق بفضولك. هدفنا هو تقديم محتوى يثري عقلك، يحترم وقتك، ويترك لديك دائماً معلومة جديدة تستحق أن تشاركها مع من حولك.
          </p>
        </section>

        <section style={{ textAlign: 'center', marginTop: '1rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))', borderRadius: '12px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.2rem', textAlign: 'center' }}>
            انضم إلى رحلتنا
          </h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1rem' }}>
            "العلم في حكاية" ليس مجرد موقع أو قناة، بل هو مجتمع لكل شغوف بالمعرفة والبحث عن الحقيقة. ندعوك للتجول بين مقالاتنا، مشاهدة فيديوهاتنا، ومشاركتنا متعة الاستكشاف يوماً بعد يوم.
          </p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '1.5rem' }}>
            لأن وراء كل حقيقة علمية... حكاية تستحق أن تُروى.
          </p>
        </section>
      </article>
    </div>
  );
}
