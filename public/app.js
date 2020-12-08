document.querySelectorAll('.price').forEach(node => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(node.textContent)
})

M.Tabs.init(document.querySelectorAll('.tabs'));
