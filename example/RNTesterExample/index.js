/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import ActionSheetAnchorExample from './ActionSheetAnchorExample';
import ActionSheetExample from './ActionSheetExample';
import ActionSheetTintExample from './ActionSheetTintExample';
import ShareActionSheetExample from './ShareActionSheetExample';
import ShareScreenshotAnchorExample from './ShareScreenshotAnchorExample';
import ShareScreenshotExample from './ShareScreenshotExample';

const EXAMPLES = [
  {
    title: 'Show Action Sheet',
    render() {
      return <ActionSheetExample />;
    },
  },
  {
    title: 'Show Action Sheet with anchor',
    render() {
      return <ActionSheetAnchorExample />;
    },
  },
  {
    title: 'Show Action Sheet with tinted buttons',
    render() {
      return <ActionSheetTintExample />;
    },
  },
  {
    title: 'Show Share Action Sheet',
    render() {
      return <ShareActionSheetExample url="https://code.facebook.com" />;
    },
  },
  {
    title: 'Share Screenshot',
    render() {
      return <ShareScreenshotExample />;
    },
  },
  {
    title: 'Share Screenshot from Anchor',
    render() {
      return <ShareScreenshotAnchorExample />;
    },
  },
];

export default EXAMPLES;
