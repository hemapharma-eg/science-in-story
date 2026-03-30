'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { createArticle } from '@/app/actions';

export default function ArticleEditorClient({ categories }: { categories: any[] }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>ابدأ بكتابة المقال هنا...</p>',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!editor) return;
      await createArticle({
        title,
        slug,
        youtubeUrl,
        categoryId: categoryId || undefined,
        isPublished,
        body: editor.getHTML(),
      });
      // Redirect or show success
      window.location.href = '/admin/articles';
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء حفظ المقال');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-editor-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>عنوان المقال *</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>الرابط اللطيف (Slug) *</label>
        <input 
          type="text" 
          value={slug} 
          onChange={(e) => setSlug(e.target.value)} 
          required 
          style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>رابط يوتيوب (اختياري)</label>
          <input 
            type="url" 
            value={youtubeUrl} 
            onChange={(e) => setYoutubeUrl(e.target.value)} 
            placeholder="https://youtube.com/watch?v=..."
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>التصنيف</label>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }}
          >
            <option value="">بدون تصنيف</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>محتوى المقال (Builder)</label>
        <div className="glass-panel editor-wrapper" style={{ minHeight: '300px', background: 'var(--background)' }}>
           {/* Simple toolbar for TipTap */}
           <div style={{ borderBottom: '1px solid var(--border)', padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
             <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} style={{ padding: '0.5rem', background: 'var(--surface)', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>B</button>
             <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} style={{ padding: '0.5rem', background: 'var(--surface)', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>I</button>
             <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} style={{ padding: '0.5rem', background: 'var(--surface)', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>H2</button>
             <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} style={{ padding: '0.5rem', background: 'var(--surface)', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>• القائمة</button>
           </div>
           <EditorContent editor={editor} />
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={isPublished} 
          onChange={(e) => setIsPublished(e.target.checked)} 
        />
        <span>نشر المقال فوراً</span>
      </label>

      <button 
        type="submit" 
        disabled={loading}
        style={{ padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        {loading ? 'جاري الحفظ...' : 'حفظ ونشر'}
      </button>

    </form>
  );
}
