import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
  id: 'ELLOELLO',
  title: 'Cool item',
  price: 5000,
  description: 'This item is really cool',
  image: 'coolitem.jpg',
  largeImage: 'largecoolitem.jpg'
};

const wrapper = shallow(<ItemComponent item={fakeItem} />);

describe('<Item />', () => {
  it('renders the price tag and title properly', () => {
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('£50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);

    // console.log(PriceTag.dive().text()); // .dive() goes one level deeper in component without having to mount
    // console.log(wrapper.debug());
  });
  it('renders the image properly', () => {
    const { src, alt } = wrapper.find('img').props();
    expect(src).toBe(fakeItem.image);
    expect(alt).toBe('Cool item');
  });
  it('renders the buttons properly', () => {
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    // expect(buttonList.find('Link').exists()).toBe(true);
    expect(buttonList.find('List')).toBeTruthy();
    expect(buttonList.find('AddToCart')).toBeTruthy();
    expect(buttonList.find('DeleteItem')).toBeTruthy();

    console.log(buttonList.children().debug());
  });
});
