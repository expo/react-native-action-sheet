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
    render: <ActionSheetExample />,
  },
  {
    title: 'Show Action Sheet with anchor',
    render: <ActionSheetAnchorExample />,
  },
  {
    title: 'Show Action Sheet with tinted buttons',
    render: <ActionSheetTintExample />,
  },
  {
    title: 'Show Share Action Sheet',
    render: <ShareActionSheetExample url="https://code.facebook.com" />,
  },
  {
    title: 'Share Screenshot',
    render: <ShareScreenshotExample />,
  },
  {
    title: 'Share Screenshot from Anchor',
    render: <ShareScreenshotAnchorExample />,
  },
];

export default EXAMPLES;
