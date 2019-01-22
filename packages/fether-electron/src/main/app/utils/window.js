// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: BSD-3-Clause

/**
 * Returns the latest window resolution if it differs from the previous resolution.
 * Note that the previous window resolution may be undefined if being changed in settings.
 */
const getScreenResolution = (
  previousScreenResolution,
  currentScreenResolution
) => {
  if (
    !previousScreenResolution ||
    (previousScreenResolution &&
      previousScreenResolution.x !== currentScreenResolution.x) ||
    (previousScreenResolution &&
      previousScreenResolution.y !== currentScreenResolution.y)
  ) {
    return currentScreenResolution;
  }
  return previousScreenResolution;
};

/**
 * Determine if we need to fix the window position. We will fix the window position if
 * the user is changing display resolution since the previousScreenResolution may be undefined,
 * or if the new previousScreenResolution was larger than the currentScreenResolution
 * to prevent the window moved to a position where it is cropped or not visible at all.
 */
const shouldFixWindowPosition = (
  previousScreenResolution,
  currentScreenResolution
) => {
  console.log(
    'Window position (previous, current): ',
    previousScreenResolution,
    currentScreenResolution
  );
  if (
    !previousScreenResolution ||
    (previousScreenResolution &&
      previousScreenResolution.x > currentScreenResolution.x) ||
    (previousScreenResolution &&
      previousScreenResolution.y > currentScreenResolution.y)
  ) {
    return true;
  }
  return false;
};

export { getScreenResolution, shouldFixWindowPosition };
