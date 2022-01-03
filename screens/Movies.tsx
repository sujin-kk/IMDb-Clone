import styled from "styled-components/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, useColorScheme, View } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { MovieResponse, moviesAPI } from "../api";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { useState } from "react";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient(); // 모든 쿼리와 캐시 관리
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying
  } = useQuery<MovieResponse>(
    ["movies", "nowPlaying"], moviesAPI.nowPlaying
  );
  const { 
    isLoading: trendingLoading,
    data: trendingData, 
    isRefetching: isRefetchingTrending
  } = useQuery<MovieResponse>(
    ["movies", "trending"], moviesAPI.trending
  );
  const { 
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming
  } = useQuery<MovieResponse>(
    ["movies", "upcoming"], moviesAPI.upcoming
  );

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  
  const onRefresh = async () => {
    // refetching query
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  
  const isDark = useColorScheme() === "dark";
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 3.7,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? <HList title="Trending Movies" data={trendingData.results}/> : null }
          <ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
        </>
      }
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      data={upcomingData.results}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};


export default Movies;