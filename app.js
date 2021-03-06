document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = document.querySelector('input');
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);

  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');

    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'Edit');
    appendToLI('button', 'textContent', 'Remove');

    return li;
  }

  filterCheckbox.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    const list = ul.children;
    if (isChecked) {
      for (let i = 0; i < list.length; i++) {
        const li = list[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        const li = list[i];
        li.style.display = '';
      }
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = input.value;
    input.value = '';

    const li = createLI(text);

    ul.appendChild(li);
  });

  ul.addEventListener('change', (event) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const button = event.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent.toLowerCase();

      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;

          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;

          li.insertBefore(input, span);
          li.removeChild(span);

          button.textContent = 'Save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;

          li.insertBefore(span, input);
          li.removeChild(input);

          button.textContent = 'Edit';
        }
      }
      // select and run action in button's name
      nameActions[action]();
    }
  });
});