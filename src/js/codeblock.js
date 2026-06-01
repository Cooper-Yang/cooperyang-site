// Collapse / expand the source listing inside a .code-block
export function initCodeBlocks() {
  document.querySelectorAll('.code-expand-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-block');
      if (!block) return;
      const collapsed = block.classList.toggle('collapsed');
      btn.textContent = collapsed ? '// expand full source' : '// collapse';
    });
  });
}
