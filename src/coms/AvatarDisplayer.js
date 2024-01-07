import * as React from 'react';
import {Avatar} from 'react-native-paper';

const AvatarDisplayer = props => {
  const imgurl = props.url;
  const username = props.username;

  const [ifError, onError] = React.useState(false);

  return (
    <>
      {ifError || imgurl == null ? (
        <Avatar.Text
          style={props.style}
          theme={props.theme}
          size={props.size}
          label={username.substr(0, 1)}
        />
      ) : (
        <Avatar.Image
          style={props.style}
          size={props.size}
          source={{uri: imgurl}}
          onError={() => {
            onError(true);
          }}
        />
      )}
    </>
  );
};

export default AvatarDisplayer;
