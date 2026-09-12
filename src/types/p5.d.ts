// p5 2.3.3 lists ./types/p5.d.ts in its package.json but does not publish it.
// The studio's gauge sketch types the slice of p5 it uses itself
// (see src/components/studio/cards/measured-card.tsx), so a bare module
// declaration is enough to import it.
declare module 'p5';
