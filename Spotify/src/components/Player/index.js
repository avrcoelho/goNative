import React from 'react';

import {
  Container,
  CoverBackground,
  EpisodeInfo,
  Title,
  Author,
  Controls,
  ControlButton,
  ContronIcon,
} from './styles';

const Player = () => (
  <Container>
    <CoverBackground source={{ uri: '' }} />
    <EpisodeInfo>
      <Title>Perpecut</Title>
      <Author>Linkin Park</Author>
    </EpisodeInfo>
    <Controls>
      {/* <ControlButton onPress={() => {}}>
        <ContronIcon name="skip-previous" />
      </ControlButton>
      <ControlButton onPress={() => {}}>
        <ContronIcon name="play-circle-filled" />
      </ControlButton>
      <ControlButton onPress={() => {}}>
        <ContronIcon name="skip-next" />
      </ControlButton> */}
    </Controls>
  </Container>
);

export default Player;
