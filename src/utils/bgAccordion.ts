type Group = {
  category: string;
  rows: HTMLElement[];
  paragraphs: HTMLElement[];
  sizers: HTMLElement[];
  maxHeight: number;
};

export const bgAccordion = () => {
  const section = document.querySelector<HTMLElement>('.section_bg-accordion');
  if (!section) return;

  const radios = Array.from(
    section.querySelectorAll<HTMLElement>('.bg-accordion_item-radio-field')
  );

  const groupsByCategory = new Map<string, Group>();
  const groupOrder: Group[] = [];
  const radioToGroup = new Map<Element, Group>();

  radios.forEach((radio) => {
    // Each accordion "row" is a full `.bg-accordion_names-item-wrapper` — it owns
    // its own 3-column grid (label column + content columns). The radio, paragraph,
    // sizer, and category heading all live inside this single element.
    const row = radio.closest<HTMLElement>('.bg-accordion_names-item-wrapper');
    if (!row) return;
    const heading = row.querySelector<HTMLElement>('.heading-style-h3.u-smaller');
    const category = heading?.textContent?.trim() ?? '';
    const paragraph = row.querySelector<HTMLElement>('.bg-accordion_item-paragraph');
    const sizer = row.querySelector<HTMLElement>('.bg-accordion_item-sizer');
    if (!paragraph || !sizer) return;

    let group = groupsByCategory.get(category);
    if (!group) {
      group = { category, rows: [], paragraphs: [], sizers: [], maxHeight: 0 };
      groupsByCategory.set(category, group);
      groupOrder.push(group);
    }
    group.rows.push(row);
    group.paragraphs.push(paragraph);
    group.sizers.push(sizer);
    radioToGroup.set(radio, group);
  });

  const syncGroup = (group: Group) => {
    group.sizers.forEach((s) => {
      s.style.height = '0px';
    });

    for (let i = 0; i < group.rows.length; i++) {
      const radio = group.rows[i].querySelector('.bg-accordion_item-radio-field');
      if (!radio?.classList.contains('fs-cmsfilter_active')) continue;
      const h = group.paragraphs[i].getBoundingClientRect().height;
      group.sizers[i].style.height = h + 'px';
      break;
    }
  };

  document.fonts.ready.then(() => {
    groupOrder.forEach((group) => {
      const firstRow = group.rows[0];
      const parent = firstRow.parentElement;
      if (!parent) return;

      // Wrap the full NIWs (whole grid rows) in a group container. Each NIW keeps
      // its own internal grid — the wrapper only stacks them vertically.
      const wrapper = document.createElement('div');
      wrapper.className = 'bg-accordion_group-wrapper';
      parent.insertBefore(wrapper, firstRow);
      group.rows.forEach((row) => wrapper.appendChild(row));

      // Measure max paragraph height for the group.
      group.maxHeight = group.paragraphs.reduce(
        (max, p) => Math.max(max, p.getBoundingClientRect().height),
        0
      );

      // Measure the wrapper's collapsed natural height (all sizers at 0).
      group.sizers.forEach((s) => {
        s.style.height = '0px';
      });
      const collapsedHeight = wrapper.getBoundingClientRect().height;

      // Reserve enough vertical space for the worst-case expansion. The browser
      // enforces this every frame, so opening/closing within the group never
      // changes the wrapper's outer height.
      wrapper.style.minHeight = collapsedHeight + group.maxHeight + 'px';

      syncGroup(group);
    });
  });

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type !== 'attributes' || m.attributeName !== 'class') continue;
      const target = m.target as Element;
      if (!target.classList.contains('bg-accordion_item-radio-field')) continue;
      const group = radioToGroup.get(target);
      if (!group) continue;
      syncGroup(group);
    }
  });

  observer.observe(section, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class'],
  });
};
