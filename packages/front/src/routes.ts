import { index, layout, physical, rootRoute } from '@tanstack/virtual-file-routes';

export const routes = rootRoute('__root.tsx', [
    layout('(layouts)/public_layout.tsx', [index('(public)/index.lazy.tsx')]),
    layout('(layouts)/auth_layout.tsx', [physical('/auth', '(public)/auth')]),
    layout('(layouts)/protected_layout.tsx', [physical('', '(protected)')]),
]);