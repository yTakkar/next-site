const makeLink = onSelect => ({ tab, children }) => (
  <a href="javascript:;" onClick={() => onSelect(tab)}>
    {children}
  </a>
);

export default Comp => ({ onSelect }) => (
  <div style={{ margin: 8 }}>
    <div style={{ all: 'initial' }}>
      <Comp A={makeLink(onSelect)} />
    </div>
  </div>
);
