import React, { useEffect, useReducer, useState } from 'react'
import classes from './homePage.module.css'
import { getAll, getAllByTag, getAllTags, search } from '../../services/foodService';
import { getAllItems } from '../../services/itemService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';
import Hero from './Hero';
import AllCarousel from '../../components/Carousel/AllCarousel'
// import { sample_item } from '../../test/mock-data.js';
// import { sample_items } from '../../test/mock-data-02.js';
import Title from '../../components/Title/Title';
import PicSection from '../../components/PicSection/PicSection';
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails';

const initialState = {foods: [], tags:[]};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
      default:
        return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {foods ,tags} = state;
  const {searchTerm, tag} = useParams();
  const [items, setItems] = useState([]);

  useEffect( () => {
    getAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload:tags}));

    const loadedFoods = tag
    ? getAllByTag(tag)
    : searchTerm
    ? search(searchTerm)
    : getAll();
    loadedFoods.then(foods => dispatch({type:'FOODS_LOADED', payload: foods}));
  }, [searchTerm,tag]);

  useEffect(() => {
    getAllItems().then(items => setItems(items));
  }, []);

  return (
    <div className={classes.container}>
      <Hero></Hero>
      <Title title="NEW IN"/>
      <AllCarousel items={items}/>
      <PicSection imageUrl={"/images/section/section-2.PNG"}/>
      {/* <Search/> */}
      <Tags tags={tags}/>
      {/* <Thumbnails foods={foods}/> */}
      <Title title="BESTSELLERS"/>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
