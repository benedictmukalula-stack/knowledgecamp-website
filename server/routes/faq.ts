import type { RequestHandler } from "express";
import { FAQ_KNOWLEDGE_BASE } from "../../shared/faq";

export const handleFaqIndex: RequestHandler = (req, res) => {
  const category = (req.query.category as string | undefined)?.trim();
  const limit = Number(req.query.limit ?? 0) || undefined;

  let items = FAQ_KNOWLEDGE_BASE;
  if (category) {
    items = items.filter((i) => i.category.toLowerCase() === category.toLowerCase());
  }

  if (limit && limit > 0) {
    items = items.slice(0, limit);
  }

  res.json({ items });
};

export const handleFaqSearch: RequestHandler = (req, res) => {
  const q = (req.query.q as string | undefined)?.toLowerCase().trim();
  const category = (req.query.category as string | undefined)?.toLowerCase().trim();
  const limit = Number(req.query.limit ?? 5) || 5;

  if (!q) {
    return res.json({ items: FAQ_KNOWLEDGE_BASE });
  }

  const terms = q.split(/\s+/).filter(Boolean);

  let items = FAQ_KNOWLEDGE_BASE;
  if (category) {
    items = items.filter((i) => i.category.toLowerCase() === category);
  }

  const scored = items.map((item) => {
    const haystack = `${item.question} ${item.answer} ${(item.tags ?? []).join(" ")}`.toLowerCase();
    const score = terms.reduce((acc, term) => (haystack.includes(term) ? acc + 1 : acc), 0);
    return { item, score };
  }).filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score);

  res.json({
    items: scored.slice(0, limit).map((s) => s.item),
    query: q,
    category: category ?? null,
  });
};
